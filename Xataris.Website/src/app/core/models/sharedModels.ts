export interface DropdownModel<T>{
    text: string;
    value: T;
    selected: boolean;
}
export interface Credentials{
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
}
export interface SimpleResult{
    isSuccess: boolean;
    errorMessage: string;
    id: any;
}
export interface ApiResult<T>{
    data: T;
    version: string;
    localJwt: string;
    sessionJwt: string;
}
export interface UserDetails{
    firstName: string;
    lastName: string;
    dateRegistered: any;
    lockoutEnd: any;
    twoFactorEnabled: boolean;
    phoneNumberConfirmed: boolean;
    phoneNumber: string;
    concurrencyStamp: string;
    securityStamp: string;
    passwordHash: string;
    emailConfirmed: boolean;
    normalizedEmail: string;
    email: string;
    normalizedUserName: string;
    userName: string;
    id: string;
    lockoutEnabled: boolean;
    accessFailedCount: number;
    group: UserGroup;
    lastLoggedIn: Date;
    password: string;
    ptmEnabled: boolean;
}

export interface UserGroup{
    title: string;
    description: string;
    modules: Array<DropdownModel<number>>;
    accessLevel: DropdownModel<number>;
}

export interface UserGroupPoco{
    id: number;
    title: string;
    description: string;
    users: Array<UserDetails>;
    moduleGroups: Array<ModuleGroupPoco>;
    accessLevel: AccessLevel;
}

export interface ModuleGroupPoco{
    groupId: number;
    moduleId: number;
    module: ModulePoco;
    group: UserGroup;
}

export interface ModulePoco {
    id: number;
    name: string;
    description: string;
}

export enum AccessLevel{
    Read = 0,
        Write = 1,
        Design = 2,
        Admin = 3
}

export enum XatarisPermissions{
    Read = 0,
    Write = 1,
    Design = 2,
    Admin = 3
}
export enum XatarisModules{
    Users = 1,
    PTM = 2,
    Inventory = 3,
    Sites = 4,
    Orders = 5
}

export interface UserLevel{
    module: number;
    permission: number;
    usersId: string;
}

export interface SitePoco{
    id: number;
    name: string;
    abbr: string;
    locationId: number;
    location: LocationPoco;
    timeSheets: Array<TimeSheetPoco>;
}

export interface LocationPoco{
    formattedAddress: string;
    latitude: number;
    longitude: number;
    sites: Array<SitePoco>;
}

export interface TimeSheetPoco{
    code: string;
    dateCreated: Date;
    specificLocation: string;
    detailedPoint: string;
    sheetStatus: StatusPoco;
    description: string;
    operatorTime: any;
    assistantTime: any;
    originalQuote: boolean;
    quoteNo: string;
    sINumber: string;
    usersId: string;
    siteId: number;
    user: UserDetails;
    site: SitePoco;
    materials: Array<any>;
    nonMaterials: Array<any>;
}

export enum StatusPoco{
    Chasing = 0,
    FirstFix = 1,
    SecondFix = 2,
    FinalFix = 3
}

export interface MaterialPoco{
    id: number;
    stockCode: string;
    stockDescription: string;
    cost: number;
    items: Array<MaterialItemPoco>;
}

export interface MaterialItemPoco{
    BOM_No: string;
    MaterialId: number;
    Quantity: number;
    TimeSheetId: number;
    TimeSheet: TimeSheetPoco;
    Material: MaterialPoco;
}

export interface InventoryPoco{
    warehouseId: number;
    materialId: number;
    quantity: number;
    dateAdded: Date;
    dateModified: Date;
    modifiedBy: string;
    material: MaterialPoco;
    warehouse: WarehousePoco;
}

export interface WarehousePoco{
    id: number;
    name: string;
    inventory: Array<InventoryPoco>;
}
export interface LoginResult{
    email: string;
    id: string;
    isSuccess: boolean;
    group: UserGroupPoco;
    modules: Array<ModulePoco>;
}

export enum NotificationType {
    Warning,
    Success,
    Error
}
