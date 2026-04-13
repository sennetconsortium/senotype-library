import { Select } from 'antd';
import log from 'xac-loglevel'

function PageSizer({ options, setPageSize }) {

  const onChange = (value) => {
    setPageSize(Number(value));
  };

  const onSearch = (value) => {
    log.info('PageSizer.onSearch', value);
  };

  return (
    <div>
      <Select
        showSearch={{ optionFilterProp: 'label', onSearch }}
        placeholder="Rows per page"
        onChange={onChange}
        options={options}
      />
    </div>
  );
}

export default PageSizer;
