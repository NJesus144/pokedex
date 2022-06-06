import React from 'react';

interface IconProps {
    icon: string;
}

export const Icon: React.FC<IconProps> = ({icon}) => {
    return (
        <div>
            {icon}
        </div>
    );
};

export default Icon;