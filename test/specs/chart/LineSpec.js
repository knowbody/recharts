import React from 'react';
import { expect } from 'chai';
import { LineChart, Line, Curve } from 'recharts';
import { mount, render } from 'enzyme';
import sinon from 'sinon';

describe('<LineChart />', () => {
  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
    { name: 'Page C', uv: 300, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
    { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
    { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
  ];

  it('renders 1 line in simple LineChart', () => {
    const wrapper = render(
      <LineChart width={400} height={400} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <Line type="monotone" dataKey="uv" stroke="#ff7300"/>
      </LineChart>
    );
    expect(wrapper.find('.recharts-line .recharts-line-curve').length).to.equal(1);
  });

  it('renders 6 labels when label is setted to be true', () => {
    const wrapper = render(
      <LineChart width={400} height={400} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <Line isAnimationActive={false} label type="monotone" dataKey="uv" stroke="#ff7300"/>
      </LineChart>
    );
    expect(wrapper.find('.recharts-line-label').length).to.equal(6);
  });

  it('renders 6 dots when dot is setted to be true', () => {
    const wrapper = render(
      <LineChart width={400} height={400} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <Line isAnimationActive={false} dot type="monotone" dataKey="uv" stroke="#ff7300"/>
      </LineChart>
    );
    expect(wrapper.find('.recharts-line-dot').length).to.equal(6);
  });

  it('click on Curve should invoke onClick callback', () => {
    const onClick = sinon.spy();
    const wrapper = mount(
      <LineChart width={400} height={400} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <Line onClick={onClick} type="monotone" dataKey="uv" stroke="#ff7300"/>
      </LineChart>
    );
    const curve = wrapper.find(Curve);
    curve.simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });
});
