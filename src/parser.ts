import { Err, makeAsyncThrowable, Ok, Result, RootError } from '@celo/base'
import { Interface, ParamType, TransactionDescription } from '@ethersproject/abi'
import { AddressInfoType } from '.'
import { AbiFetcher, FetchAbiError, getAbisFromFetchers } from './abiFetcher'
import { AddressFetchResult, AddressInfo, AddressInfoFetcher } from './addressInfo'
import { Address, Transaction } from './types'
import { BigNumber } from 'bignumber.js'

export enum ParserErrorTypes {
  NoAbiFetchers = 'NoAbiFetchers',
  AbiMismatch = 'AbiMismatch',
  Unknown = 'Unknown',
}
export class NoAbiFetchersError extends RootError<ParserErrorTypes.NoAbiFetchers> {
  constructor(error: Error) {
    super(ParserErrorTypes.NoAbiFetchers)
    this.message = error.message
  }
}

export class AbiMismatchError extends RootError<ParserErrorTypes.AbiMismatch> {
  constructor(error: Error) {
    super(ParserErrorTypes.AbiMismatch)
    this.message = error.message
  }
}

export class UnknownError extends RootError<ParserErrorTypes.Unknown> {
  constructor(error: Error) {
    super(ParserErrorTypes.Unknown)
    this.message = error.message
  }
}

export type ParserErrors = FetchAbiError | AbiMismatchError | UnknownError | NoAbiFetchersError



interface ParserConstructorOpts {
  abiFetchers?: AbiFetcher[],
  addressInfoFetchers?: AddressInfoFetcher[]
  advancedMode?: boolean;
  decimalPlaces?: number;
  addressesLength?: number;
}

export interface ParserResult {
  transactionDescription: Result<TransactionDescription, ParserErrors>,
  addressInfo: AddressFetchResult
}


export class Parser {
  public readonly abiFetchers: AbiFetcher[];
  public readonly addressInfoFetchers: AddressInfoFetcher[];
  public readonly advancedMode: boolean;
  public readonly addressesLength: number;
  public readonly decimalPlaces: number;
  /**
   * Creates a new instance of the parser
   * @param abiFetchers Array of AbiFetchers, order matters as priority (i.e. proxy fetcher before plain fetcher)
   */
  constructor(opts: ParserConstructorOpts) {
    this.abiFetchers = opts.abiFetchers ? opts.abiFetchers : []
    this.addressInfoFetchers = opts.addressInfoFetchers ? opts.addressInfoFetchers : []
    this.advancedMode = opts.advancedMode !== undefined ? opts.advancedMode : true
    this.addressesLength = opts.addressesLength && opts.addressesLength > 3 ? opts.addressesLength : -1
    this.decimalPlaces = opts.decimalPlaces && opts.decimalPlaces ? opts.decimalPlaces : -1
  }

  async parseAsResult(tx: Transaction): Promise<ParserResult> {
    const transactionDescription = await this.parseTransactionDescriptionAsResult(tx)
    const addressInfo = await this.getAddressInfo(tx, transactionDescription)
    return {
      transactionDescription,
      addressInfo
    }
  }

  async getAddressInfo(tx: Transaction, txDescriptionResult: Result<TransactionDescription, ParserErrors>): Promise<AddressFetchResult> {
    const addresses = [tx.from, tx.to]
    if (txDescriptionResult.ok) {
      const addressesFromTxDescription = txDescriptionResult.result.args.flatMap((arg, index) => {
        const fragment = txDescriptionResult.result.functionFragment.inputs[index]
        return this.collectAddressesFromParam(arg, fragment)
      })
      addresses.push(...addressesFromTxDescription)
    }

    const context = { tx }

    const result = await Promise.all(addresses.map(async address => {
      const info = await Promise.all(this.addressInfoFetchers.map(_ => _.fetchInfo(address, context)))
      return [address, info.flat()] as [Address, AddressInfo[]]
    }))
    const ret: AddressFetchResult = {}
    result.forEach(([address, info]) => ret[address] = info)
    return ret
  }

  private collectAddressesFromParam(paramValue: any, paramType: ParamType): Address[] {
    if (paramType.arrayChildren) {
      return paramValue.flatMap((arg: any) => this.collectAddressesFromParam(arg, paramType.arrayChildren))
    }
    if (paramType.type === 'address') {
      return [paramValue]
    }
    return []
  }


  async parseTransactionDescriptionAsResult(tx: Transaction): Promise<Result<TransactionDescription, ParserErrors>> {
    if (this.abiFetchers.length === 0) {
      return Err(new NoAbiFetchersError(new Error('No AbiFetchers specified')))
    }
    const abis = await getAbisFromFetchers(this.abiFetchers, tx.to)

    if (!abis.ok) {
      return abis
    }

    const abiInterface = new Interface(abis.result[0])
    try {
      const data = abiInterface.parseTransaction(tx)
      return Ok(data)
    } catch (error) {
      if (error instanceof Error) {
        return Err(new AbiMismatchError(error))
      }
      return Err(new UnknownError((error as any).toString()))
    }
  }
  parseTransactionDescription = makeAsyncThrowable(this.parseTransactionDescriptionAsResult.bind(this))

  private formatParam(paramValue: any, paramType: ParamType, addressInfo?: AddressFetchResult) {
    if (paramType.arrayChildren) {
      return `[${paramValue
        .map((el: any) => this.formatParam(el, paramType.arrayChildren, addressInfo))
        .join(', ')}]`
    }
    if (paramType.type === 'uint256') {
      return this.advancedMode
        ? paramValue.toString()
        : new BigNumber(paramValue.toString()).div(new BigNumber(10).pow(18)).toFixed(this.decimalPlaces !== -1 ? this.decimalPlaces : 18)
    }

    if (paramType.type === 'address') {
      const formattedValue = this.formatAddress(paramValue, addressInfo)
      if (this.addressesLength !== -1) {
        const cut = (this.addressesLength / 2)
        return `"${formattedValue.slice(0, cut + 2)}...${formattedValue.slice(formattedValue.length - cut, formattedValue.length)}"`
      }
      return `"${formattedValue}"`
    }

    return paramValue
  }

  public formatAddress(address: string, addressInfo?: AddressFetchResult) {
    if (!addressInfo) return address
    const addyInfo = addressInfo[address]
    if (addyInfo.length === 0) return address
    switch (addyInfo[0].type) {
      case AddressInfoType.TokenListInfo:
        return `Token: ${addyInfo[0].name} (${addyInfo[0].symbol})`
      case AddressInfoType.GenericAddressInfo:
        return addyInfo[0].name
    }
    return address
  }

  formatTxDescriptionToHuman(description: TransactionDescription, addressInfo?: AddressFetchResult) {
    const functionName = description.name
    const inputs = description.args.map((arg, index) => {
      const fragment = description.functionFragment.inputs[index]
      return `${fragment.name}: ${this.formatParam(arg, fragment, addressInfo)}`
    })
    return `${functionName}(${inputs.join(', ')})`
  }
}

export {TransactionDescription} from '@ethersproject/abi'