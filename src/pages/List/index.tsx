import React, { useEffect, useMemo, useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import qs from 'qs';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
  id: {
    value: string;
  };
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const view = (record: DataType) => {
    navigate(`/list/detail/${record.id.value}`);
  };
  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
        render: (name, record) => (
          <Button type="link" onClick={() => view(record)}>{`${name.first} ${name.last}`}</Button>
        ),
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' },
        ],
        width: '20%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ],
    [],
  );

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default App;
