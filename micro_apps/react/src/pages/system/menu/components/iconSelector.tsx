import React, { useState } from 'react';
import { Popover, Input, Row, Col } from 'antd';
import Icon from '@ant-design/icons';
import { iconMap } from './iconMap';

interface IconSelectorComponentProps {
  value?: string;
  onChange?: (value: string) => void;
}

const IconSelector: React.FC<IconSelectorComponentProps> = ({ value, onChange }) => {
  const [currentIcon, handleCurrentIcon] = useState<string>('search');
  const [iconVisible, handleIconVisible] = useState<boolean>(false);

  const selectedIcon = (iconStr: string) => {
    handleCurrentIcon(iconStr);
    handleIconVisible(false);
    triggerChange(iconStr);
  };

  const triggerChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  const iconContent = () => {
    return (
      <div>
        <Row>
          <Col span={8} className='point' onClick={() => selectedIcon('bell')}>
            <Icon component={iconMap.bell} /> bell
          </Col>
          <Col span={8} className='point' onClick={() => selectedIcon('combination')}>
            <Icon component={iconMap.combination} /> combination
          </Col>
          <Col span={8} className='point' onClick={() => selectedIcon('connect')}>
            <Icon component={iconMap.connect} /> connect
          </Col>
        </Row>
        <Row>
          <Col span={8} className='point' onClick={() => selectedIcon('dataIntegration')}>
            <Icon component={iconMap.dataIntegration} /> dataIntegration
          </Col>
          <Col span={8} className='point' onClick={() => selectedIcon('delete')}>
            <Icon component={iconMap.delete} /> delete
          </Col>
          <Col span={8} className='point' onClick={() => selectedIcon('development')}>
            <Icon component={iconMap.development} /> development
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Popover content={iconContent} overlayStyle={{width: 402}} trigger='click' placement='bottom' visible={iconVisible} onVisibleChange={handleIconVisible}>
      <Input
        type='text'
        value={value}
        readOnly
        placeholder='请选择图标'
        prefix={
          <Icon component={iconMap[currentIcon]} style={{ color: 'rgba(0,0,0,.45)' }}/>
        }
      />
    </Popover>
  );
};

export default IconSelector;
