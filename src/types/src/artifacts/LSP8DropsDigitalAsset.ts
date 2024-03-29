/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface LSP8DropsDigitalAssetInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "activate"
      | "activated"
      | "allowlist"
      | "authorizeOperator"
      | "balanceOf"
      | "batchCalls"
      | "claim"
      | "claimBalanceOf"
      | "configure"
      | "deactivate"
      | "defaultTokenUri"
      | "getData"
      | "getDataBatch"
      | "getDataBatchForTokenIds"
      | "getDataForTokenId"
      | "getOperatorsOf"
      | "isOperatorFor"
      | "mint"
      | "mintAllowlist"
      | "mintPrice"
      | "owner"
      | "profileMintLimit"
      | "renounceOwnership"
      | "revokeOperator"
      | "service"
      | "serviceFeePoints"
      | "setData"
      | "setDataBatch"
      | "setDataBatchForTokenIds"
      | "setDataForTokenId"
      | "setDefaultTokenUri"
      | "startTime"
      | "supportsInterface"
      | "tokenAt"
      | "tokenIdsOf"
      | "tokenOwnerOf"
      | "tokenSupplyCap"
      | "totalSupply"
      | "transfer"
      | "transferBatch"
      | "transferOwnership"
      | "verifier"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Activated"
      | "Claimed"
      | "ConfigurationChanged"
      | "DataChanged"
      | "Deactivated"
      | "DefaultTokenDataChanged"
      | "Minted"
      | "OperatorAuthorizationChanged"
      | "OperatorRevoked"
      | "OwnershipTransferred"
      | "TokenIdDataChanged"
      | "Transfer"
  ): EventFragment;

  encodeFunctionData(functionFragment: "activate", values?: undefined): string;
  encodeFunctionData(functionFragment: "activated", values?: undefined): string;
  encodeFunctionData(functionFragment: "allowlist", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "authorizeOperator",
    values: [AddressLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "batchCalls",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "claimBalanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "configure",
    values: [BigNumberish, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deactivate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "defaultTokenUri",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getData", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "getDataBatch",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getDataBatchForTokenIds",
    values: [BytesLike[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getDataForTokenId",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getOperatorsOf",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isOperatorFor",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [AddressLike, BigNumberish, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "mintAllowlist",
    values: [
      BytesLike[],
      BigNumberish,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "mintPrice", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "profileMintLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "revokeOperator",
    values: [AddressLike, BytesLike, boolean, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "service", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "serviceFeePoints",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setData",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setDataBatch",
    values: [BytesLike[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setDataBatchForTokenIds",
    values: [BytesLike[], BytesLike[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setDataForTokenId",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setDefaultTokenUri",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "startTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenIdsOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenOwnerOf",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenSupplyCap",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, AddressLike, BytesLike, boolean, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferBatch",
    values: [AddressLike[], AddressLike[], BytesLike[], boolean[], BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "verifier", values?: undefined): string;

  decodeFunctionResult(functionFragment: "activate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "activated", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowlist", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "authorizeOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "batchCalls", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "configure", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deactivate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "defaultTokenUri",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getData", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDataBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDataBatchForTokenIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDataForTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOperatorsOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isOperatorFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintAllowlist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "profileMintLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "service", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "serviceFeePoints",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setData", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDataBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDataBatchForTokenIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDataForTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDefaultTokenUri",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "startTime", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenAt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenIdsOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenOwnerOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenSupplyCap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verifier", data: BytesLike): Result;
}

export namespace ActivatedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ClaimedEvent {
  export type InputTuple = [
    account: AddressLike,
    beneficiary: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    account: string,
    beneficiary: string,
    amount: bigint
  ];
  export interface OutputObject {
    account: string;
    beneficiary: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ConfigurationChangedEvent {
  export type InputTuple = [
    startTime: BigNumberish,
    mintPrice: BigNumberish,
    profileMintLimit: BigNumberish,
    allowlistRoot: BytesLike
  ];
  export type OutputTuple = [
    startTime: bigint,
    mintPrice: bigint,
    profileMintLimit: bigint,
    allowlistRoot: string
  ];
  export interface OutputObject {
    startTime: bigint;
    mintPrice: bigint;
    profileMintLimit: bigint;
    allowlistRoot: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DataChangedEvent {
  export type InputTuple = [dataKey: BytesLike, dataValue: BytesLike];
  export type OutputTuple = [dataKey: string, dataValue: string];
  export interface OutputObject {
    dataKey: string;
    dataValue: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DeactivatedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DefaultTokenDataChangedEvent {
  export type InputTuple = [defaultTokenData: BytesLike];
  export type OutputTuple = [defaultTokenData: string];
  export interface OutputObject {
    defaultTokenData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MintedEvent {
  export type InputTuple = [
    recipient: AddressLike,
    tokenIds: BytesLike[],
    totalPrice: BigNumberish
  ];
  export type OutputTuple = [
    recipient: string,
    tokenIds: string[],
    totalPrice: bigint
  ];
  export interface OutputObject {
    recipient: string;
    tokenIds: string[];
    totalPrice: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OperatorAuthorizationChangedEvent {
  export type InputTuple = [
    operator: AddressLike,
    tokenOwner: AddressLike,
    tokenId: BytesLike,
    operatorNotificationData: BytesLike
  ];
  export type OutputTuple = [
    operator: string,
    tokenOwner: string,
    tokenId: string,
    operatorNotificationData: string
  ];
  export interface OutputObject {
    operator: string;
    tokenOwner: string;
    tokenId: string;
    operatorNotificationData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OperatorRevokedEvent {
  export type InputTuple = [
    operator: AddressLike,
    tokenOwner: AddressLike,
    tokenId: BytesLike,
    notified: boolean,
    operatorNotificationData: BytesLike
  ];
  export type OutputTuple = [
    operator: string,
    tokenOwner: string,
    tokenId: string,
    notified: boolean,
    operatorNotificationData: string
  ];
  export interface OutputObject {
    operator: string;
    tokenOwner: string;
    tokenId: string;
    notified: boolean;
    operatorNotificationData: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokenIdDataChangedEvent {
  export type InputTuple = [
    tokenId: BytesLike,
    dataKey: BytesLike,
    dataValue: BytesLike
  ];
  export type OutputTuple = [
    tokenId: string,
    dataKey: string,
    dataValue: string
  ];
  export interface OutputObject {
    tokenId: string;
    dataKey: string;
    dataValue: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    operator: AddressLike,
    from: AddressLike,
    to: AddressLike,
    tokenId: BytesLike,
    force: boolean,
    data: BytesLike
  ];
  export type OutputTuple = [
    operator: string,
    from: string,
    to: string,
    tokenId: string,
    force: boolean,
    data: string
  ];
  export interface OutputObject {
    operator: string;
    from: string;
    to: string;
    tokenId: string;
    force: boolean;
    data: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface LSP8DropsDigitalAsset extends BaseContract {
  connect(runner?: ContractRunner | null): LSP8DropsDigitalAsset;
  waitForDeployment(): Promise<this>;

  interface: LSP8DropsDigitalAssetInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  activate: TypedContractMethod<[], [void], "nonpayable">;

  activated: TypedContractMethod<[], [boolean], "view">;

  allowlist: TypedContractMethod<[], [string], "view">;

  authorizeOperator: TypedContractMethod<
    [
      operator: AddressLike,
      tokenId: BytesLike,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[tokenOwner: AddressLike], [bigint], "view">;

  batchCalls: TypedContractMethod<
    [data: BytesLike[]],
    [string[]],
    "nonpayable"
  >;

  claim: TypedContractMethod<
    [beneficiary: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  claimBalanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  configure: TypedContractMethod<
    [
      startTime_: BigNumberish,
      mintPrice_: BigNumberish,
      profileMintLimit_: BigNumberish,
      allowlistRoot_: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  deactivate: TypedContractMethod<[], [void], "nonpayable">;

  defaultTokenUri: TypedContractMethod<[], [string], "view">;

  getData: TypedContractMethod<[dataKey: BytesLike], [string], "view">;

  getDataBatch: TypedContractMethod<
    [dataKeys: BytesLike[]],
    [string[]],
    "view"
  >;

  getDataBatchForTokenIds: TypedContractMethod<
    [tokenIds: BytesLike[], dataKeys: BytesLike[]],
    [string[]],
    "view"
  >;

  getDataForTokenId: TypedContractMethod<
    [tokenId: BytesLike, dataKey: BytesLike],
    [string],
    "view"
  >;

  getOperatorsOf: TypedContractMethod<[tokenId: BytesLike], [string[]], "view">;

  isOperatorFor: TypedContractMethod<
    [operator: AddressLike, tokenId: BytesLike],
    [boolean],
    "view"
  >;

  mint: TypedContractMethod<
    [
      recipient: AddressLike,
      amount: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "payable"
  >;

  mintAllowlist: TypedContractMethod<
    [
      proof: BytesLike[],
      index: BigNumberish,
      recipient: AddressLike,
      amount: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "payable"
  >;

  mintPrice: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  profileMintLimit: TypedContractMethod<[], [bigint], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  revokeOperator: TypedContractMethod<
    [
      operator: AddressLike,
      tokenId: BytesLike,
      notify: boolean,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  service: TypedContractMethod<[], [string], "view">;

  serviceFeePoints: TypedContractMethod<[], [bigint], "view">;

  setData: TypedContractMethod<
    [dataKey: BytesLike, dataValue: BytesLike],
    [void],
    "payable"
  >;

  setDataBatch: TypedContractMethod<
    [dataKeys: BytesLike[], dataValues: BytesLike[]],
    [void],
    "payable"
  >;

  setDataBatchForTokenIds: TypedContractMethod<
    [tokenIds: BytesLike[], dataKeys: BytesLike[], dataValues: BytesLike[]],
    [void],
    "nonpayable"
  >;

  setDataForTokenId: TypedContractMethod<
    [tokenId: BytesLike, dataKey: BytesLike, dataValue: BytesLike],
    [void],
    "nonpayable"
  >;

  setDefaultTokenUri: TypedContractMethod<
    [newTokenUri: BytesLike],
    [void],
    "nonpayable"
  >;

  startTime: TypedContractMethod<[], [bigint], "view">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  tokenAt: TypedContractMethod<[index: BigNumberish], [string], "view">;

  tokenIdsOf: TypedContractMethod<
    [tokenOwner: AddressLike],
    [string[]],
    "view"
  >;

  tokenOwnerOf: TypedContractMethod<[tokenId: BytesLike], [string], "view">;

  tokenSupplyCap: TypedContractMethod<[], [bigint], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transfer: TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BytesLike,
      force: boolean,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  transferBatch: TypedContractMethod<
    [
      from: AddressLike[],
      to: AddressLike[],
      tokenId: BytesLike[],
      force: boolean[],
      data: BytesLike[]
    ],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  verifier: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "activate"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "activated"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "allowlist"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "authorizeOperator"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      tokenId: BytesLike,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[tokenOwner: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "batchCalls"
  ): TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<
    [beneficiary: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claimBalanceOf"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "configure"
  ): TypedContractMethod<
    [
      startTime_: BigNumberish,
      mintPrice_: BigNumberish,
      profileMintLimit_: BigNumberish,
      allowlistRoot_: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "deactivate"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "defaultTokenUri"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getData"
  ): TypedContractMethod<[dataKey: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getDataBatch"
  ): TypedContractMethod<[dataKeys: BytesLike[]], [string[]], "view">;
  getFunction(
    nameOrSignature: "getDataBatchForTokenIds"
  ): TypedContractMethod<
    [tokenIds: BytesLike[], dataKeys: BytesLike[]],
    [string[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getDataForTokenId"
  ): TypedContractMethod<
    [tokenId: BytesLike, dataKey: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getOperatorsOf"
  ): TypedContractMethod<[tokenId: BytesLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "isOperatorFor"
  ): TypedContractMethod<
    [operator: AddressLike, tokenId: BytesLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [
      recipient: AddressLike,
      amount: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "mintAllowlist"
  ): TypedContractMethod<
    [
      proof: BytesLike[],
      index: BigNumberish,
      recipient: AddressLike,
      amount: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "mintPrice"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "profileMintLimit"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "revokeOperator"
  ): TypedContractMethod<
    [
      operator: AddressLike,
      tokenId: BytesLike,
      notify: boolean,
      operatorNotificationData: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "service"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "serviceFeePoints"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "setData"
  ): TypedContractMethod<
    [dataKey: BytesLike, dataValue: BytesLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "setDataBatch"
  ): TypedContractMethod<
    [dataKeys: BytesLike[], dataValues: BytesLike[]],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "setDataBatchForTokenIds"
  ): TypedContractMethod<
    [tokenIds: BytesLike[], dataKeys: BytesLike[], dataValues: BytesLike[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setDataForTokenId"
  ): TypedContractMethod<
    [tokenId: BytesLike, dataKey: BytesLike, dataValue: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setDefaultTokenUri"
  ): TypedContractMethod<[newTokenUri: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "startTime"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "tokenAt"
  ): TypedContractMethod<[index: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "tokenIdsOf"
  ): TypedContractMethod<[tokenOwner: AddressLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "tokenOwnerOf"
  ): TypedContractMethod<[tokenId: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "tokenSupplyCap"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [
      from: AddressLike,
      to: AddressLike,
      tokenId: BytesLike,
      force: boolean,
      data: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferBatch"
  ): TypedContractMethod<
    [
      from: AddressLike[],
      to: AddressLike[],
      tokenId: BytesLike[],
      force: boolean[],
      data: BytesLike[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "verifier"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "Activated"
  ): TypedContractEvent<
    ActivatedEvent.InputTuple,
    ActivatedEvent.OutputTuple,
    ActivatedEvent.OutputObject
  >;
  getEvent(
    key: "Claimed"
  ): TypedContractEvent<
    ClaimedEvent.InputTuple,
    ClaimedEvent.OutputTuple,
    ClaimedEvent.OutputObject
  >;
  getEvent(
    key: "ConfigurationChanged"
  ): TypedContractEvent<
    ConfigurationChangedEvent.InputTuple,
    ConfigurationChangedEvent.OutputTuple,
    ConfigurationChangedEvent.OutputObject
  >;
  getEvent(
    key: "DataChanged"
  ): TypedContractEvent<
    DataChangedEvent.InputTuple,
    DataChangedEvent.OutputTuple,
    DataChangedEvent.OutputObject
  >;
  getEvent(
    key: "Deactivated"
  ): TypedContractEvent<
    DeactivatedEvent.InputTuple,
    DeactivatedEvent.OutputTuple,
    DeactivatedEvent.OutputObject
  >;
  getEvent(
    key: "DefaultTokenDataChanged"
  ): TypedContractEvent<
    DefaultTokenDataChangedEvent.InputTuple,
    DefaultTokenDataChangedEvent.OutputTuple,
    DefaultTokenDataChangedEvent.OutputObject
  >;
  getEvent(
    key: "Minted"
  ): TypedContractEvent<
    MintedEvent.InputTuple,
    MintedEvent.OutputTuple,
    MintedEvent.OutputObject
  >;
  getEvent(
    key: "OperatorAuthorizationChanged"
  ): TypedContractEvent<
    OperatorAuthorizationChangedEvent.InputTuple,
    OperatorAuthorizationChangedEvent.OutputTuple,
    OperatorAuthorizationChangedEvent.OutputObject
  >;
  getEvent(
    key: "OperatorRevoked"
  ): TypedContractEvent<
    OperatorRevokedEvent.InputTuple,
    OperatorRevokedEvent.OutputTuple,
    OperatorRevokedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "TokenIdDataChanged"
  ): TypedContractEvent<
    TokenIdDataChangedEvent.InputTuple,
    TokenIdDataChangedEvent.OutputTuple,
    TokenIdDataChangedEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "Activated()": TypedContractEvent<
      ActivatedEvent.InputTuple,
      ActivatedEvent.OutputTuple,
      ActivatedEvent.OutputObject
    >;
    Activated: TypedContractEvent<
      ActivatedEvent.InputTuple,
      ActivatedEvent.OutputTuple,
      ActivatedEvent.OutputObject
    >;

    "Claimed(address,address,uint256)": TypedContractEvent<
      ClaimedEvent.InputTuple,
      ClaimedEvent.OutputTuple,
      ClaimedEvent.OutputObject
    >;
    Claimed: TypedContractEvent<
      ClaimedEvent.InputTuple,
      ClaimedEvent.OutputTuple,
      ClaimedEvent.OutputObject
    >;

    "ConfigurationChanged(uint256,uint256,uint256,bytes32)": TypedContractEvent<
      ConfigurationChangedEvent.InputTuple,
      ConfigurationChangedEvent.OutputTuple,
      ConfigurationChangedEvent.OutputObject
    >;
    ConfigurationChanged: TypedContractEvent<
      ConfigurationChangedEvent.InputTuple,
      ConfigurationChangedEvent.OutputTuple,
      ConfigurationChangedEvent.OutputObject
    >;

    "DataChanged(bytes32,bytes)": TypedContractEvent<
      DataChangedEvent.InputTuple,
      DataChangedEvent.OutputTuple,
      DataChangedEvent.OutputObject
    >;
    DataChanged: TypedContractEvent<
      DataChangedEvent.InputTuple,
      DataChangedEvent.OutputTuple,
      DataChangedEvent.OutputObject
    >;

    "Deactivated()": TypedContractEvent<
      DeactivatedEvent.InputTuple,
      DeactivatedEvent.OutputTuple,
      DeactivatedEvent.OutputObject
    >;
    Deactivated: TypedContractEvent<
      DeactivatedEvent.InputTuple,
      DeactivatedEvent.OutputTuple,
      DeactivatedEvent.OutputObject
    >;

    "DefaultTokenDataChanged(bytes)": TypedContractEvent<
      DefaultTokenDataChangedEvent.InputTuple,
      DefaultTokenDataChangedEvent.OutputTuple,
      DefaultTokenDataChangedEvent.OutputObject
    >;
    DefaultTokenDataChanged: TypedContractEvent<
      DefaultTokenDataChangedEvent.InputTuple,
      DefaultTokenDataChangedEvent.OutputTuple,
      DefaultTokenDataChangedEvent.OutputObject
    >;

    "Minted(address,bytes32[],uint256)": TypedContractEvent<
      MintedEvent.InputTuple,
      MintedEvent.OutputTuple,
      MintedEvent.OutputObject
    >;
    Minted: TypedContractEvent<
      MintedEvent.InputTuple,
      MintedEvent.OutputTuple,
      MintedEvent.OutputObject
    >;

    "OperatorAuthorizationChanged(address,address,bytes32,bytes)": TypedContractEvent<
      OperatorAuthorizationChangedEvent.InputTuple,
      OperatorAuthorizationChangedEvent.OutputTuple,
      OperatorAuthorizationChangedEvent.OutputObject
    >;
    OperatorAuthorizationChanged: TypedContractEvent<
      OperatorAuthorizationChangedEvent.InputTuple,
      OperatorAuthorizationChangedEvent.OutputTuple,
      OperatorAuthorizationChangedEvent.OutputObject
    >;

    "OperatorRevoked(address,address,bytes32,bool,bytes)": TypedContractEvent<
      OperatorRevokedEvent.InputTuple,
      OperatorRevokedEvent.OutputTuple,
      OperatorRevokedEvent.OutputObject
    >;
    OperatorRevoked: TypedContractEvent<
      OperatorRevokedEvent.InputTuple,
      OperatorRevokedEvent.OutputTuple,
      OperatorRevokedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "TokenIdDataChanged(bytes32,bytes32,bytes)": TypedContractEvent<
      TokenIdDataChangedEvent.InputTuple,
      TokenIdDataChangedEvent.OutputTuple,
      TokenIdDataChangedEvent.OutputObject
    >;
    TokenIdDataChanged: TypedContractEvent<
      TokenIdDataChangedEvent.InputTuple,
      TokenIdDataChangedEvent.OutputTuple,
      TokenIdDataChangedEvent.OutputObject
    >;

    "Transfer(address,address,address,bytes32,bool,bytes)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
