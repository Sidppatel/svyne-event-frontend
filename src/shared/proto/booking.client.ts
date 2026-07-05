



import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { TableBookingService } from "./booking";
import type { UpdateTableTemplateRequest } from "./booking";
import type { CreateTableTemplateRequest } from "./booking";
import type { ListTableTemplatesResponse } from "./booking";
import type { Empty } from "./common";
import type { ListTableTemplatePriceRulesResponse } from "./booking";
import type { CreateTableTemplatePriceRuleRequest } from "./booking";
import type { UpdateEventTicketTypeRequest } from "./booking";
import type { CreateEventTicketTypeRequest } from "./booking";
import type { CreateEventTableRequest } from "./booking";
import type { ListEventTableTypesResponse } from "./booking";
import type { ListTablesResponse } from "./booking";
import type { LockTableRequest } from "./booking";
import type { AckResponse } from "./common";
import type { SaveEventLayoutRequest } from "./booking";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { EventLayout } from "./booking";
import type { UuidValue } from "./common";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface ITableBookingServiceClient {
    
    getEventLayout(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, EventLayout>;
    
    saveEventLayout(input: SaveEventLayoutRequest, options?: RpcOptions): UnaryCall<SaveEventLayoutRequest, AckResponse>;
    
    lockTable(input: LockTableRequest, options?: RpcOptions): UnaryCall<LockTableRequest, AckResponse>;
    
    releaseTableLock(input: LockTableRequest, options?: RpcOptions): UnaryCall<LockTableRequest, AckResponse>;
    
    listTablesForEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListTablesResponse>;
    
    listEventTableTypes(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListEventTableTypesResponse>;
    
    createEventTable(input: CreateEventTableRequest, options?: RpcOptions): UnaryCall<CreateEventTableRequest, UuidValue>;
    
    deleteEventTable(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    createEventTicketType(input: CreateEventTicketTypeRequest, options?: RpcOptions): UnaryCall<CreateEventTicketTypeRequest, UuidValue>;
    
    updateEventTicketType(input: UpdateEventTicketTypeRequest, options?: RpcOptions): UnaryCall<UpdateEventTicketTypeRequest, AckResponse>;
    
    deleteEventTicketType(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    createTableTemplatePriceRule(input: CreateTableTemplatePriceRuleRequest, options?: RpcOptions): UnaryCall<CreateTableTemplatePriceRuleRequest, UuidValue>;
    
    listTableTemplatePriceRules(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListTableTemplatePriceRulesResponse>;
    
    deleteTableTemplatePriceRule(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    listTableTemplates(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListTableTemplatesResponse>;
    
    createTableTemplate(input: CreateTableTemplateRequest, options?: RpcOptions): UnaryCall<CreateTableTemplateRequest, UuidValue>;
    
    updateTableTemplate(input: UpdateTableTemplateRequest, options?: RpcOptions): UnaryCall<UpdateTableTemplateRequest, AckResponse>;
    
    deleteTableTemplate(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
}

export class TableBookingServiceClient implements ITableBookingServiceClient, ServiceInfo {
    typeName = TableBookingService.typeName;
    methods = TableBookingService.methods;
    options = TableBookingService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    getEventLayout(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, EventLayout> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, EventLayout>("unary", this._transport, method, opt, input);
    }
    
    saveEventLayout(input: SaveEventLayoutRequest, options?: RpcOptions): UnaryCall<SaveEventLayoutRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<SaveEventLayoutRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    lockTable(input: LockTableRequest, options?: RpcOptions): UnaryCall<LockTableRequest, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<LockTableRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    releaseTableLock(input: LockTableRequest, options?: RpcOptions): UnaryCall<LockTableRequest, AckResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<LockTableRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listTablesForEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListTablesResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListTablesResponse>("unary", this._transport, method, opt, input);
    }
    
    listEventTableTypes(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListEventTableTypesResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListEventTableTypesResponse>("unary", this._transport, method, opt, input);
    }
    
    createEventTable(input: CreateEventTableRequest, options?: RpcOptions): UnaryCall<CreateEventTableRequest, UuidValue> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateEventTableRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    deleteEventTable(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    createEventTicketType(input: CreateEventTicketTypeRequest, options?: RpcOptions): UnaryCall<CreateEventTicketTypeRequest, UuidValue> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateEventTicketTypeRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    updateEventTicketType(input: UpdateEventTicketTypeRequest, options?: RpcOptions): UnaryCall<UpdateEventTicketTypeRequest, AckResponse> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateEventTicketTypeRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    deleteEventTicketType(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    createTableTemplatePriceRule(input: CreateTableTemplatePriceRuleRequest, options?: RpcOptions): UnaryCall<CreateTableTemplatePriceRuleRequest, UuidValue> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateTableTemplatePriceRuleRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    listTableTemplatePriceRules(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListTableTemplatePriceRulesResponse> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListTableTemplatePriceRulesResponse>("unary", this._transport, method, opt, input);
    }
    
    deleteTableTemplatePriceRule(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[13], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listTableTemplates(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListTableTemplatesResponse> {
        const method = this.methods[14], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, ListTableTemplatesResponse>("unary", this._transport, method, opt, input);
    }
    
    createTableTemplate(input: CreateTableTemplateRequest, options?: RpcOptions): UnaryCall<CreateTableTemplateRequest, UuidValue> {
        const method = this.methods[15], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateTableTemplateRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    updateTableTemplate(input: UpdateTableTemplateRequest, options?: RpcOptions): UnaryCall<UpdateTableTemplateRequest, AckResponse> {
        const method = this.methods[16], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateTableTemplateRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    deleteTableTemplate(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[17], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
}
