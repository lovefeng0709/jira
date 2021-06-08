/*
 * @Descripttion: test
 * @Date: 2021-06-08 16:26:10
 * @LastEditors: love-coding
 * @LastEditTime: 2021-06-08 16:37:42
 */
export interface Task {
    id: number;
    name: string;
    // 经办人
    processorId: number;
    projectId: number;
    // 任务组
    epicId: number;
    kanbanId: number;
    // bug or task
    typeId: number;
    note: string;
}