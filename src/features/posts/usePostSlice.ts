import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/store';
import {
  postActions,
  postDataSelector,
  postLoadingSelector,
} from './posts.sclice';

export const usePostSlice = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector(postLoadingSelector);
  const data = useSelector(postDataSelector);

  const fetchAll = useCallback(() => {
    dispatch(postActions.fetchAll());
  }, [dispatch]);

  const fetchOne = useCallback(
    (id: number) => {
      dispatch(postActions.fetchOne(id));
    },
    [dispatch],
  );

  return {
    data,
    loading,
    fetchAll,
    fetchOne,
  };
};
