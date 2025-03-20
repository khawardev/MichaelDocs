'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Providers = ({ children }: any) => {
    return (
        <>
            {children}
            <ProgressBar
                height="5px"
                color="#FF0000"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
};

export default Providers;