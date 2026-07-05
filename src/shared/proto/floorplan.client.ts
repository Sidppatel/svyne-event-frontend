



import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { FloorPlanService } from "./floorplan";
import type { AckResponse } from "./common";
import type { ApplyTemplateRequest } from "./floorplan";
import type { ListFloorPlanTemplatesResponse } from "./floorplan";
import type { Empty } from "./common";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { UuidValue } from "./common";
import type { SaveAsTemplateRequest } from "./floorplan";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IFloorPlanServiceClient {
    
    saveAsTemplate(input: SaveAsTemplateRequest, options?: RpcOptions): UnaryCall<SaveAsTemplateRequest, UuidValue>;
    
    listFloorPlanTemplates(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListFloorPlanTemplatesResponse>;
    
    applyTemplate(input: ApplyTemplateRequest, options?: RpcOptions): UnaryCall<ApplyTemplateRequest, AckResponse>;
    
    deleteFloorPlanTemplate(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
}

export class FloorPlanServiceClient implements IFloorPlanServiceClient, ServiceInfo {
    typeName = FloorPlanService.typeName;
    methods = FloorPlanService.methods;
    options = FloorPlanService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    saveAsTemplate(input: SaveAsTemplateRequest, options?: RpcOptions): UnaryCall<SaveAsTemplateRequest, UuidValue> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<SaveAsTemplateRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    listFloorPlanTemplates(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListFloorPlanTemplatesResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, ListFloorPlanTemplatesResponse>("unary", this._transport, method, opt, input);
    }
    
    applyTemplate(input: ApplyTemplateRequest, options?: RpcOptions): UnaryCall<ApplyTemplateRequest, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<ApplyTemplateRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    deleteFloorPlanTemplate(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
}
