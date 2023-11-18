import { writable, get } from 'svelte/store';
import { getApi, putApi, delApi, postApi } from '../service/api';
import { router } from 'tinro';

// PS ID 들을 저장
function setPSIDs() {
    let initValues = {
        parkingStationIdList: [15162630, 2, 3, 4], // 서버에서 받은 ID 리스트
        totalParkingStationIDCount: 4, // 서버에서 받은 ID 개수
    };

    const { subscribe, update, set } = writable({ ...initValues });

    /* 사용자 정의 메소드 영역 */
    // 서버에게 모든 ID 리스트를 받아 온다.
    const fetchPSIDs = async () => {
        // 스토어 값을 get 함수로 받아오는 경우(1. 다른 스토어의 값을 참조, 2. 스벨트가 아닌 JS 파일에서 참조)
        let path = `/allParkingStations`;

        try {
            const options = {
                path: path,
            };

            const getDatas = await getApi(options);

            const newData = {
                parkingStationIdList: getDatas.parkingStationIdList,
                totalParkingStationIDCount: getDatas.totalParkingStationIDCount,
            };

            // 스토어 값 갱신. datas는 기존 스토어 값
            update((datas) => {
                datas.parkingStationIdList = newData.arkingStationIdList;
                datas.totalParkingStationIDCount =
                    newData.totalParkingStationIDCount;

                return datas;
            });
        } catch (error) {
            throw error;
        }
    };

    // 스토어 초기화
    const resetPSIDs = () => {
        set({ ...initValues });
    };

    return {
        subscribe,
        fetchPSIDs,
        resetPSIDs,
    };
}

// PS 정보를 저장(좌표, 킥보드 개수 등)
function setPSInfos() {
    // dummy data
    let initValues = {
        parkedKickBoardCntList: [],
    };

    const { subscribe, update, set } = writable({ ...initValues });

    // 서버에서 PS 별로 주차되어 있는 킥보드 수를 받아옴.
    const fetchPSInfos = async () => {
        const PSIDList = get(PSIDs); // 스토어 값 참조는 get 사용

        try {
            const options = {
                path: '/app/parkingStations',
                data: {
                    parkingStationIds: PSIDList.parkingStationIdList,
                },
            };

            const getDatas = await postApi(options);

            update((datas) => {
                datas.parkedKickBoardCntList = getDatas.parkedKickBoardCntList;
                return datas;
            });
        } catch (error) {
            throw error;
        }
    };
    const resetPSInfos = () => {
        set({ ...initValues });
    };

    return {
        subscribe,
        fetchPSInfos,
        resetPSInfos,
    };
}

function setRewards() {
    let initValues = {
        currentPoint: 0,
    };

    const { subscribe, update, set } = writable({ ...initValues });

    const fetchRewards = async () => {
        try {
            const options = {
                path: '/app/point',
            };

            const res = await getApi(options);

            update((datas) => {
                datas.currentPoint = res.currentPoint;
                return datas;
            });
        } catch (error) {
            throw error;
        }
    };

    const resetRewards = () => {
        set({ ...initValues });
    };

    return {
        subscribe,
        fetchRewards,
        resetRewards,
    };
}

function setLoadingMap() {} // PS 정보를 불러오면서 서버와 통신 중인 상태 저장
function setKickBoards() {} // PS 하나에 존재하는 킥보드 리스트
function setKickBoardInfo() {} // 킥보드 하나의 정보를 저장
function setAuth() {} // 로그인한 유저 정보
function setIsLogin() {} // 로그인한 상태인지 아닌지

export const PSIDs = setPSIDs();
export const PSInfos = setPSInfos();
export const rewards = setRewards();
export const loadingMap = setLoadingMap();
export const kickBoards = setKickBoards();
export const kickBoardInfo = setKickBoardInfo();
export const auth = setAuth();
export const isLogin = setIsLogin();
