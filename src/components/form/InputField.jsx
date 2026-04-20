import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Select } from 'antd';
import log from 'xac-loglevel'
import { Tooltip } from 'antd';

function InputField({
  id,
  label,
  helpText,
  className = '',
  selectData,
  labelTooltip,
  controlProps = {},
}) {
  const _id = id || label.toCamelCase();
  const helpBlockId = `${_id}HelpBlock`;
  return (
    <Form.Group className={`c-inputField ${className} mt-4`}>
      <Form.Label htmlFor={_id}>
        <strong>{label}</strong>
        {controlProps.required && (
          <sup className="form-required-indicator text-danger">*</sup>
        )}
        {labelTooltip && (
          <Tooltip title={labelTooltip}>
            {' '}
            <i className="bi bi-question-circle"></i>
          </Tooltip>
        )}
      </Form.Label>

      {!selectData && (
        <Form.Control
          aria-describedby={helpText ? helpBlockId : undefined}
          {...controlProps}
        />
      )}

      {/* {selectData && (
        <Form.Select {...controlProps}>
          {selectData.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      )} */}

      {selectData && (
        <Select
          suffixIcon={<i className="bi bi-chevron-down"></i>}
          showSearch={{
            optionFilterProp: 'label',
            onSearch: (v) => log.info('InputField.Select', v),
          }}
          style={{ width: '100%' }}
          {...controlProps}
          options={selectData}
        />
      )}

      {helpText && (
        <Form.Text id={helpBlockId} muted>
          {helpText}
        </Form.Text>
      )}
    </Form.Group>
  );
}

export default InputField;
