import React from 'react';

interface DynamicOWLogoProps {
  fill: string;
  style?: React.CSSProperties;
}

const DynamicOWLogo: React.FC<DynamicOWLogoProps> = ({ fill, style }) => {
  return (
    <svg version="1.1" id="svg3960" style={style} viewBox="0 0 600 600">
      <defs id="defs3962">
        <linearGradient id="linearGradient4959">
          <stop id="stop4961" stopColor="#000000" stopOpacity={1} offset="0" />
          <stop id="stop4963" stopColor="#ffffff" stopOpacity={1} offset="1" />
        </linearGradient>
        <linearGradient
          x1="300"
          y1="96.734383"
          x2="300"
          y2="505.0625"
          id="linearGradient4965"
          xlinkHref="#linearGradient4959"
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient
          x1="300.00049"
          y1="583.62787"
          x2="300.00049"
          y2="16.369165"
          id="linearGradient4973"
          xlinkHref="#linearGradient4959"
          gradientUnits="userSpaceOnUse"
        />
      </defs>
      <path
        d="M 296.70405,0.00424149 C 229.93779,0.43221149 163.9322,24.232681 112.07437,66.087451 l 56.66164,65.785689 C 216.5573,94.134131 280.99173,78.755181 340.75427,90.636091 c 32.84344,6.31836 64.09548,20.739679 90.46333,41.237049 L 487.87924,66.087451 C 434.24075,22.804341 365.76667,-1.0306785 296.70405,0.00424149 z"
        id="path3961"
        color="#000000"
        fill={fill}
        fillOpacity={1}
        fillRule="nonzero"
        stroke="none"
        strokeWidth={9}
        markerWidth={0}
        visibility="visible"
        display="inline"
        overflow="visible"
        enableBackground="accumulate"
      />
      <path
        d="M 93.627932,82.252881 C 33.924062,138.34244 -1.0821983,219.87731 0.02552166,302.12246 0.06092166,387.49363 39.004212,471.35277 103.6776,526.81868 c 59.78108,52.2845 141.08577,78.91882 220.46136,72.18109 86.01035,-6.40518 167.64782,-52.34458 218.11716,-122.14284 49.12454,-66.32853 68.37083,-153.7971 52.06401,-234.90882 C 582.33252,179.85678 549.77957,122.31301 503.48268,79.542111 L 446.82104,145.3278 c 45.65578,43.03442 70.58508,106.55713 65.88486,169.22459 -2.05604,31.04856 -11.0736,61.69033 -26.31427,88.95944 l -115.47207,-111.53814 -58.26,-125.58266 -0.0876,190.17825 116.69522,112.92659 c -52.0019,40.40208 -123.35295,53.80249 -186.57773,35.89403 -25.74389,-7.18124 -50.12185,-19.23034 -71.30879,-35.39816 L 288.86927,356.56928 c -0.20481,-61.83078 0.7175,-128.57681 -6.9e-4,-190.3826 L 230.52166,291.97369 114.05785,404.43746 c -35.530468,-62.02488 -36.380378,-142.2105 -2.18183,-204.92738 10.69103,-20.0919 24.84106,-38.42801 41.25655,-54.18228 L 96.470932,79.542111 c -0.94767,0.90359 -1.89534,1.80717 -2.843,2.71077 z"
        id="path4052"
        color="#000000"
        fill={fill}
        fillOpacity={1}
        fillRule="nonzero"
        stroke="none"
        strokeWidth={9}
        markerWidth={0}
        visibility="visible"
        display="inline"
        overflow="visible"
        enableBackground="accumulate"
      />
    </svg>
  );
};

DynamicOWLogo.defaultProps = {
  style: { height: 600, width: 600 },
};

export default DynamicOWLogo;
