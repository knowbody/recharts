/**
 * @fileOverview Sector
 */
import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import classNames from 'classnames';
import ReactUtils, { PRESENTATION_ATTRIBUTES } from '../util/ReactUtils';
const RADIAN = Math.PI / 180;

@pureRender
class Sector extends Component {

  static displayName = 'Sector';

  static propTypes = {
    ...PRESENTATION_ATTRIBUTES,
    className: PropTypes.string,
    cx: PropTypes.number,
    cy: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    onMouseEnter() {},
    onMouseLeave() {},
    onClick() {},
  };

  getDeltaAngle(startAngle, endAngle) {
    const sign = Math.sign(endAngle - startAngle);
    const deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.9999);

    return sign * deltaAngle;
  }


  getPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
    const angle = this.getDeltaAngle(startAngle, endAngle);

    // When the angle of sector equals to 360, star point and end point coincide
    const _endAngle = startAngle + angle;
    let path;


    if (innerRadius > 0) {
      path = `M ${cx + outerRadius * Math.cos(-startAngle * RADIAN)},${cy + outerRadius * Math.sin(-startAngle * RADIAN)}
              A ${outerRadius},${outerRadius},0,${+(Math.abs(angle) > 180)},${+(startAngle > _endAngle)},
              ${cx + outerRadius * Math.cos(-_endAngle * RADIAN)},${cy + outerRadius * Math.sin(-_endAngle * RADIAN)}
              L ${cx + innerRadius * Math.cos(-_endAngle * RADIAN)},${cy + innerRadius * Math.sin(-_endAngle * RADIAN)}
              A ${innerRadius},${innerRadius},0,${+(Math.abs(angle) > 180)},${+(startAngle <= _endAngle)},
              ${cx + innerRadius * Math.cos(-startAngle * RADIAN)},${cy + innerRadius * Math.sin(-startAngle * RADIAN)} Z`;
    } else {
      path = `M ${cx + outerRadius * Math.cos(-startAngle * RADIAN)},${cy + outerRadius * Math.sin(-startAngle * RADIAN)}
              A ${outerRadius},${outerRadius},0,${+(Math.abs(angle) > 180)},${+(startAngle > _endAngle)},
              ${cx + outerRadius * Math.cos(-_endAngle * RADIAN)},${cy + outerRadius * Math.sin(-_endAngle * RADIAN)}
              L ${cx},${cy} Z`;
    }

    return path;
  }

  render() {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
          onClick, onMouseEnter, onMouseLeave, className } = this.props;

    if (outerRadius < innerRadius || startAngle === endAngle) { return null; }

    const layerClass = classNames('recharts-sector', className);

    return (
      <path
        {...ReactUtils.getPresentationAttributes(this.props)}
        className={layerClass}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        d={this.getPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle)}
      />
    );
  }
}

export default Sector;
