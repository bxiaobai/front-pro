declare namespace API {
  type AddIrVO = {
    area?: Area;
    bed?: Bed;
    brxx?: Brxx;
    cfxx?: string;
    cfxxlb?: MainData[];
    creationTime?: string;
    djhs_gh?: string;
    djhs_id?: number;
    fklk?: number;
    jdt_id?: number;
    sgjs?: number;
    syds?: SydsVo[];
    tsbrxx?: string;
    txsj?: string;
    yuyuehm?: string;
    yuyuehs_id?: string;
    yuyuehsxm?: string;
    yuyuesj?: string;
    yzzxs?: Yzxxs[];
    zs?: number;
    zwsc?: string;
  };

  type AddRoomAndDeptRequest = {
    deptId?: number;
    roomId?: number[];
  };

  type Area = {
    areaName?: string;
    id?: number;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseDeptVO_ = {
    code?: number;
    data?: DeptVO;
    message?: string;
  };

  type BaseResponseDetailsVO_ = {
    code?: number;
    data?: DetailsVO;
    message?: string;
  };

  type BaseResponseDictDataVO_ = {
    code?: number;
    data?: DictDataVO;
    message?: string;
  };

  type BaseResponseDictTypeVO_ = {
    code?: number;
    data?: DictTypeVO;
    message?: string;
  };

  type BaseResponseListDeptTreeVO_ = {
    code?: number;
    data?: DeptTreeVO[];
    message?: string;
  };

  type BaseResponseListDeptVO_ = {
    code?: number;
    data?: DeptVO[];
    message?: string;
  };

  type BaseResponseListDictDataVO_ = {
    code?: number;
    data?: DictDataVO[];
    message?: string;
  };

  type BaseResponseListDictTypeVO_ = {
    code?: number;
    data?: DictTypeVO[];
    message?: string;
  };

  type BaseResponseListIrStrListVO_ = {
    code?: number;
    data?: IrStrListVO[];
    message?: string;
  };

  type BaseResponseListRoomVO_ = {
    code?: number;
    data?: RoomVO[];
    message?: string;
  };

  type BaseResponseListSeatLayoutVO_ = {
    code?: number;
    data?: SeatLayoutVO[];
    message?: string;
  };

  type BaseResponseListSeatVO_ = {
    code?: number;
    data?: SeatVO[];
    message?: string;
  };

  type BaseResponseListSourceApptsVO_ = {
    code?: number;
    data?: SourceApptsVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageResultDeptVO_ = {
    code?: number;
    data?: PageResultDeptVO_;
    message?: string;
  };

  type BaseResponsePageResultDetailsVO_ = {
    code?: number;
    data?: PageResultDetailsVO_;
    message?: string;
  };

  type BaseResponsePageResultDictDataVO_ = {
    code?: number;
    data?: PageResultDictDataVO_;
    message?: string;
  };

  type BaseResponsePageResultDictTypeVO_ = {
    code?: number;
    data?: PageResultDictTypeVO_;
    message?: string;
  };

  type BaseResponsePageResultRoomVO_ = {
    code?: number;
    data?: PageResultRoomVO_;
    message?: string;
  };

  type BaseResponsePageResultSeatVO_ = {
    code?: number;
    data?: PageResultSeatVO_;
    message?: string;
  };

  type BaseResponsePageResultTemplateVO_ = {
    code?: number;
    data?: PageResultTemplateVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePatVO_ = {
    code?: number;
    data?: PatVO;
    message?: string;
  };

  type BaseResponseRoomVO_ = {
    code?: number;
    data?: RoomVO;
    message?: string;
  };

  type BaseResponseSeatVO_ = {
    code?: number;
    data?: SeatVO;
    message?: string;
  };

  type BaseResponseTemplateVO_ = {
    code?: number;
    data?: TemplateVO;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Bed = {
    bedName?: string;
    id?: number;
  };

  type Brxx = {
    blh?: string;
    brlx?: number;
    brxb?: string;
    brxm?: string;
    csrq?: string;
    gms?: string;
    gzdw?: string;
    jtzz?: string;
    lxdh?: string;
    lxfs?: string;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type deleteDeptRoomUsingGETParams = {
    /** deptId */
    deptId: number;
    /** roomId */
    roomId: number;
  };

  type deleteDeptUsingGETParams = {
    /** id */
    id: number;
  };

  type deleteDictDataUsingGETParams = {
    /** id */
    id: number;
  };

  type deleteDictTypeUsingGETParams = {
    /** id */
    id: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type deleteRoomUsingGETParams = {
    /** id */
    id: number;
  };

  type deleteSeatUsingGETParams = {
    /** id */
    id: number;
  };

  type deleteTemplateUsingGETParams = {
    /** id */
    id: number;
  };

  type DeptAddRequest = {
    deptDesc?: string;
    deptName?: string;
    flag?: number;
    parentId?: number;
    status?: number;
    type?: number;
  };

  type DeptQueryRequest = {
    createTime?: string;
    current?: number;
    deptName?: string;
    pageSize?: number;
    parentId?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type DeptTreeVO = {
    children?: DeptTreeVO[];
    label?: string;
    value?: number;
  };

  type DeptUpdateRequest = {
    deptDesc?: string;
    deptName?: string;
    flag?: number;
    id?: number;
    parentId?: number;
    status?: number;
    type?: number;
  };

  type DeptVO = {
    createTime?: string;
    deptDesc?: string;
    deptName?: string;
    id?: number;
    parentId?: number;
    status?: number;
    type?: number;
  };

  type DetailsAddRequest = {
    addIrVO?: AddIrVO;
    card?: string;
    date?: string;
    drugList?: Drug[];
    irId?: number;
    irStrListVO?: IrStrListVO[];
    patName?: string;
    phone?: string;
    queueNum?: string;
    saveFlag?: number;
    seatId?: number;
    seatNum?: string;
    seatType?: string;
    sourceId?: string;
    times?: string[];
    type?: number;
    userId?: number;
  };

  type DetailsQueryRequest = {
    card?: string;
    createTime?: string;
    current?: number;
    date?: string;
    pageSize?: number;
    patName?: string;
    seatNum?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    time?: string;
    type?: number;
  };

  type DetailsVO = {
    card?: string;
    createTime?: string;
    date?: string;
    drugList?: Drug;
    id?: number;
    irId?: number;
    patName?: string;
    seatNum?: string;
    seatType?: string;
    sourceId?: string;
    status?: number;
    time?: string;
    type?: number;
    userId?: number;
  };

  type DictDataAddRequest = {
    dictType?: string;
    label?: string;
    status?: number;
    value?: string;
  };

  type DictDataQueryRequest = {
    current?: number;
    label?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type DictDataUpdateRequest = {
    dictType?: string;
    id?: number;
    label?: string;
    status?: number;
    value?: string;
  };

  type DictDataVO = {
    createTime?: string;
    dictType?: string;
    id?: number;
    label?: string;
    status?: number;
    value?: string;
  };

  type DictTypeAddRequest = {
    dictName?: string;
    dictType?: string;
    status?: number;
  };

  type DictTypeQueryRequest = {
    current?: number;
    dictName?: string;
    dictType?: string;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type DictTypeUpdateRequest = {
    dictName?: string;
    dictType?: string;
    id?: number;
    status?: number;
  };

  type DictTypeVO = {
    createTime?: string;
    dictName?: string;
    dictType?: string;
    id?: number;
    status?: number;
    userId?: number;
  };

  type Drug = {
    createTime?: string;
    detailsId?: number;
    drugChildren?: DrugChildren[];
    drugTime?: string;
    id?: number;
    irNos?: string;
    isDelete?: number;
    registerId?: string;
    updateTime?: string;
    userId?: number;
  };

  type DrugChildren = {
    bz?: string;
    bzjl?: string;
    cfls?: string;
    cfsbh?: string;
    createTime?: string;
    dose?: string;
    drugId?: number;
    ds?: string;
    dsybz?: number;
    fysycs?: number;
    gg?: string;
    id?: number;
    isDelete?: number;
    jl?: string;
    jpid?: number;
    kbbz?: string;
    kkcbz?: number;
    kssbz?: number;
    pcdm?: number;
    pd?: string;
    ps?: string;
    psjg?: number;
    psxx?: number;
    sfzt?: number;
    sjly?: string;
    sl?: number;
    sycs?: number;
    sydh?: string;
    sysc?: number;
    unit?: string;
    updateTime?: string;
    userId?: number;
    yf?: number;
    yfms?: string;
    ylts?: string;
    ypcs?: number;
    ypid?: string;
    ypmc?: string;
    yytj?: string;
    z_id?: number;
    zby?: number;
  };

  type getDeptByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getDetailsByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getDictDataByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getDictTypeByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getIrInfoUsingGETParams = {
    /** endTime */
    endTime?: string;
    /** medicalNumber */
    medicalNumber?: string;
    /** startTime */
    startTime?: string;
  };

  type getPatInfoUsingGETParams = {
    /** medicalNumber */
    medicalNumber?: string;
  };

  type getRoomByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getSeatByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getTemplateByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type IrStrListVO = {
    createDoctor?: string;
    creationTime?: string;
    infusionDays?: string;
    infusionNum?: number;
    infusionTime?: number;
    infusionTotal?: number;
    isCharge?: boolean;
    kfksmc?: string;
    status?: number;
    yzxxsList?: Yzxxs[];
  };

  type listByDeptIdUsableUsingGETParams = {
    /** deptId */
    deptId: number;
  };

  type listDeptDockerUsingGETParams = {
    /** deptId */
    deptId: number;
  };

  type listSeatAllUsingGETParams = {
    /** id */
    id: number;
  };

  type listSeatByRoomIdUsingGETParams = {
    /** id */
    id: number;
  };

  type LoginUserVO = {
    createTime?: string;
    deptId?: number;
    deptName?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type MainData = {
    brxx?: Brxx;
    bz?: string;
    cfsbh?: string;
    hlybz?: string;
    infusionDays?: string;
    jzlb?: string;
    kfksdm?: string;
    kfksmc?: string;
    kfsj?: string;
    kfysxm?: string;
    ksdm?: string;
    lgby?: number;
    patientSourceID?: string;
    registerID?: string;
    scdjsj?: string;
    sfxmxx?: Sfxmxx[];
    sjly?: string;
    sysfsl?: number;
    sysl?: number;
    syzssl?: number;
    xiuzhengd?: string;
    ysdm?: string;
    yzxxs?: Yzxxs[];
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageResultDeptVO_ = {
    list?: DeptVO[];
    total?: number;
  };

  type PageResultDetailsVO_ = {
    list?: DetailsVO[];
    total?: number;
  };

  type PageResultDictDataVO_ = {
    list?: DictDataVO[];
    total?: number;
  };

  type PageResultDictTypeVO_ = {
    list?: DictTypeVO[];
    total?: number;
  };

  type PageResultRoomVO_ = {
    list?: RoomVO[];
    total?: number;
  };

  type PageResultSeatVO_ = {
    list?: SeatVO[];
    total?: number;
  };

  type PageResultTemplateVO_ = {
    list?: TemplateVO[];
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PatVO = {
    birthday?: string;
    card?: string;
    companyAddress?: string;
    companyName?: string;
    contactAddress?: string;
    createTime?: string;
    displayAge?: string;
    height?: number;
    id?: number;
    marriageCode?: number;
    name?: string;
    nameSpell?: string;
    phone?: string;
    registedResidenceAddress?: string;
    sexCode?: number;
    userId?: number;
    weight?: number;
  };

  type removeDetailsUsingGETParams = {
    /** id */
    id?: number;
  };

  type RoomAddRequest = {
    irDesc?: string;
    irName?: string;
    irPlace?: string;
    numberPoint?: string;
    patType?: number;
    phone?: string;
    smsTemplateId?: string;
    status?: number;
  };

  type RoomQueryRequest = {
    current?: number;
    irName?: string;
    pageSize?: number;
    patType?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type RoomUpdateRequest = {
    id?: number;
    irDesc?: string;
    irName?: string;
    irPlace?: string;
    numberPoint?: string;
    patType?: number;
    phone?: string;
    smsTemplateId?: string;
    status?: number;
  };

  type RoomVO = {
    createTime?: string;
    id?: number;
    irDesc?: string;
    irName?: string;
    irPlace?: string;
    numberPoint?: string;
    patType?: number;
    phone?: string;
    smsTemplateId?: string;
    status?: number;
  };

  type SeatAddRequest = {
    area?: string;
    flag?: string;
    irId?: number;
    patType?: number;
    seatCol?: number;
    seatNumber?: string;
    seatRow?: number;
    status?: number;
  };

  type SeatLayoutVO = {
    area?: string;
    children?: SeatVO[];
  };

  type SeatQueryRequest = {
    area?: string;
    current?: number;
    flag?: string;
    irId?: number;
    pageSize?: number;
    patType?: number;
    seatNumber?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type SeatUpdateRequest = {
    area?: string;
    flag?: string;
    id?: number;
    irId?: number;
    patType?: number;
    seatCol?: number;
    seatNumber?: string;
    seatRow?: number;
    status?: number;
  };

  type SeatVO = {
    area?: string;
    createTime?: string;
    flag?: string;
    id?: number;
    irId?: number;
    patType?: number;
    seatCol?: number;
    seatNumber?: string;
    seatRow?: number;
    status?: number;
  };

  type Sfxmxx = {
    followObjectAmount?: string;
    followObjectCode?: string;
    followObjectName?: string;
    followObjectNum?: string;
    followObjectUnit?: string;
    orderBatchNo?: string;
  };

  type SourceAddRequest = {
    dates?: string[];
    irId?: number;
  };

  type SourceApptsVO = {
    id?: number;
    irId?: string;
    normalNum?: number;
    normalUsedNum?: number;
    tempNum?: number;
    tempUsedNum?: number;
    time?: string;
  };

  type SourceQueryRequest = {
    current?: number;
    date?: string;
    irId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    type?: number;
  };

  type SydsVo = {
    kbbz?: string;
    ps?: string;
    yzxxs?: Yzxxs[];
  };

  type TemplateAddRequest = {
    endTime?: Time1;
    irId?: number;
    normalNum?: number;
    patType?: number;
    startTime?: Time1;
    tempNum?: number;
  };

  type TemplateQueryRequest = {
    current?: number;
    irId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type TemplateUpdateRequest = {
    endTime?: Time1;
    id?: number;
    irId?: number;
    normalNum?: number;
    patType?: number;
    startTime?: Time1;
    tempNum?: number;
  };

  type TemplateVO = {
    createTime?: string;
    endTime?: Time;
    id?: number;
    irId?: number;
    normalNum?: number;
    patType?: number;
    startTime?: Time;
    tempNum?: number;
  };

  type Time = {
    date?: number;
    day?: number;
    hours?: number;
    minutes?: number;
    month?: number;
    seconds?: number;
    time?: number;
    timezoneOffset?: number;
    year?: number;
  };

  type Time1 = {
    date?: number;
    hours?: number;
    minutes?: number;
    month?: number;
    seconds?: number;
    time?: number;
    year?: number;
  };

  type User = {
    code?: string;
    createTime?: string;
    deptId?: number;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    deptId?: number;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type Yzxxs = {
    bz?: string;
    bzjl?: string;
    cfls?: string;
    cfsbh?: string;
    color?: string;
    dose?: string;
    ds?: string;
    dsybz?: number;
    fysycs?: number;
    gg?: string;
    id?: number;
    jl?: string;
    jpid?: number;
    kbbz?: string;
    kkcbz?: number;
    kssbz?: number;
    pcdm?: number;
    pd?: string;
    ps?: string;
    psjg?: number;
    psxx?: number;
    sfzt?: string;
    sjly?: string;
    sl?: number;
    sycs?: number;
    sydh?: string;
    sysc?: string;
    txbz?: number;
    unit?: string;
    yf?: number;
    yfms?: string;
    ylts?: string;
    ypID?: string;
    ypcs?: number;
    ypmc?: string;
    yytj?: string;
    z_id?: number;
    zby?: boolean;
  };
}
