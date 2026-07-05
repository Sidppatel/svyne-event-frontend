



import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { FeeService } from "./fees";
import type { AssignFeeFormulaRequest } from "./fees";
import type { DeveloperEventsResponse } from "./fees";
import type { AckResponse } from "./common";
import type { FeeFormula } from "./fees";
import type { UuidValue } from "./common";
import type { FeeFormulaInput } from "./fees";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { ListFeeFormulasResponse } from "./fees";
import type { Empty } from "./common";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IFeeServiceClient {
    
    listFeeFormulas(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListFeeFormulasResponse>;
    
    createFeeFormula(input: FeeFormulaInput, options?: RpcOptions): UnaryCall<FeeFormulaInput, UuidValue>;
    
    updateFeeFormula(input: FeeFormula, options?: RpcOptions): UnaryCall<FeeFormula, AckResponse>;
    
    deleteFeeFormula(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    listAllEvents(input: Empty, options?: RpcOptions): UnaryCall<Empty, DeveloperEventsResponse>;
    
    assignFeeFormula(input: AssignFeeFormulaRequest, options?: RpcOptions): UnaryCall<AssignFeeFormulaRequest, AckResponse>;
}

export class FeeServiceClient implements IFeeServiceClient, ServiceInfo {
    typeName = FeeService.typeName;
    methods = FeeService.methods;
    options = FeeService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    listFeeFormulas(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListFeeFormulasResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, ListFeeFormulasResponse>("unary", this._transport, method, opt, input);
    }
    
    createFeeFormula(input: FeeFormulaInput, options?: RpcOptions): UnaryCall<FeeFormulaInput, UuidValue> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<FeeFormulaInput, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    updateFeeFormula(input: FeeFormula, options?: RpcOptions): UnaryCall<FeeFormula, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<FeeFormula, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    deleteFeeFormula(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listAllEvents(input: Empty, options?: RpcOptions): UnaryCall<Empty, DeveloperEventsResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, DeveloperEventsResponse>("unary", this._transport, method, opt, input);
    }
    
    assignFeeFormula(input: AssignFeeFormulaRequest, options?: RpcOptions): UnaryCall<AssignFeeFormulaRequest, AckResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<AssignFeeFormulaRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
}
