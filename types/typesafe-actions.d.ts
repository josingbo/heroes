export function action(type: any, payload?: any, meta?: any): any;
export function createAction(actionType: any, actionResolverHandler: any): any;
export function createActionDeprecated(actionType: any, creatorFunction: any): any;
export function createAsyncAction(requestType: any, successType: any, failureType: any): any;
export function createCustomAction(type: any, actionCreatorHandler: any): any;
export function createStandardAction(actionType: any): any;
export function getType(creator: any): any;
export function isActionOf(creatorOrCreators: any, actionOrNil: any): any;
export function isOfType(actionType: any, actionOrNil: any): any;
