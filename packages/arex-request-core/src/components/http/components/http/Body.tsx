import { css, useTheme } from '@emotion/react';
import { Radio, RadioChangeEvent, Select } from 'antd';
import React, { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Context } from '../../../../providers/ConfigProvider';
import RawBody from './RawBody';
const HttpBody = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [value, setValue] = useState('application/json');

  const { store, dispatch } = useContext(Context);

  const bigCateOptions = ['none', 'x-www-form-urlencoded', 'raw'];

  const rawSmallCateOptions = [
    {
      label: 'JSON',
      value: 'application/json',
      test: (
        <span
          css={css`
            color: ${theme.colorPrimary};
          `}
        >
          JSON
        </span>
      ),
    },
    {
      label: 'protobuf',
      value: 'application/protobuf',
      test: (
        <span
          css={css`
            color: ${theme.colorPrimary};
          `}
        >
          protobuf
        </span>
      ),
    },
  ];

  const onChange = (value: any) => {
    dispatch((state) => {
      state.request.body.contentType = value;
      state.request.headers = state.request.headers.filter(
        (head) => head.key.toLowerCase() !== 'content-type',
      );
      state.request.headers.unshift({
        key: 'Content-Type',
        value: value,
        active: true,
      });
    });
  };
  const rawBodyRef = useRef<any>(null);

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin: 6px 0;
        `}
      >
        <div>
          <Radio.Group options={bigCateOptions} value={'raw'} />

          <Select
            value={store.request.body.contentType}
            bordered={false}
            size={'small'}
            options={rawSmallCateOptions}
            optionLabelProp={'test'}
            dropdownMatchSelectWidth={120}
            onChange={onChange}
          />
        </div>

        <a>{t('action.prettify')}</a>
      </div>

      <RawBody />
    </div>
  );
};

export default HttpBody;
