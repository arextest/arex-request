import { collectionOriginalTreeToAntdTreeData } from '../../helpers/collection/util';
import request from '../../utils/request';
// import { request } from '../../utils';

export function queryWorkspaceById(params: { id: string }) {
  return request
    .post<{
      fsTree: {
        id: string;
        roots: any[];
        userName: string;
        workspaceName: string;
      };
    }>(`/report/filesystem/queryWorkspaceById`, params)
    .then((res) => Promise.resolve(collectionOriginalTreeToAntdTreeData(res.body.fsTree.roots)));
}
