
// 定义 stageMap 接口
interface stageMap {
    id: number;
    name: string; // 关卡名称
    playerPos: number[]; // 玩家位置
    enemyinfo: { // 怪物信息
        type: "random" | "fixed"; // 随机生成or固定位置
        number: number; // 若随机填个数
        list: Array<{
            names: "Zombie"; // 暂时一种怪
            x: number;
            y: number;
        }>;
    };
    wallinfo: { // 墙信息
        list: Array<{
            x: number;
            y: number;
            L: number;
            v?: boolean;
        }>;
        node: Record<string, [number, number]>; // 每个节点对应坐标
        adj: Record<string, number[]>; // 邻接矩阵
    };
}

// 使用 import.meta.glob 动态导入文件夹下的所有 JSON 文件
const mapFiles = import.meta.glob('../../map/*.json', { as: 'raw', eager: true });

// 将导入的文件内容转换为 stageMap 类型的数组
const maplist: stageMap[] = Object.values(mapFiles).map((fileContent: string) => {
    return JSON.parse(fileContent) as stageMap;
});
Object.freeze(maplist)
// 导出关卡数据
export const stageMaps = {
    maplist
};

export type { stageMap };

