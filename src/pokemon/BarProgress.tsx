import React from 'react';

interface BarProgressProps {
    statsName: string;
    statsBase: number;
}

const BarProgress: React.FC<BarProgressProps> = ({statsName, statsBase}) => {
  const progressPerCent=(statsBase/2)

    return (
        <div className='flex justify-between'>
            <div style={{width: `${progressPerCent}%`}} className="h-full w-full text-white bg-orange-600 px-4 shadow-lg shadow-orange-600/50 block rounded-lg p-1" >
              {statsName} 
            </div>
            <div>
                {statsBase}
            </div>
        </div>
    );
};

export default BarProgress;