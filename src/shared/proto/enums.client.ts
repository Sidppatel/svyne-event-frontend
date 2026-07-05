



import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { EnumService } from "./enums";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { ListEnumsResponse } from "./enums";
import type { ListEnumsRequest } from "./enums";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IEnumServiceClient {
    
    listEnums(input: ListEnumsRequest, options?: RpcOptions): UnaryCall<ListEnumsRequest, ListEnumsResponse>;
}

export class EnumServiceClient implements IEnumServiceClient, ServiceInfo {
    typeName = EnumService.typeName;
    methods = EnumService.methods;
    options = EnumService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    listEnums(input: ListEnumsRequest, options?: RpcOptions): UnaryCall<ListEnumsRequest, ListEnumsResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<ListEnumsRequest, ListEnumsResponse>("unary", this._transport, method, opt, input);
    }
}
