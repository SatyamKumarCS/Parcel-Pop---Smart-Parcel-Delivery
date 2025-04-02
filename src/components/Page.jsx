export default function Page({ children }) {
    return (
        <div className={`relative bg-[url("/bgs/bg1.svg")] overflow-hidden min-h-screen`}>
            <div className="absolute inset-0 bg-background dark:bg-dark-background bg-opacity-95 dark:bg-opacity-70 backdrop-blur-[2px]"></div>
            <div className="relative z-20">{children}</div>
        </div>
    );
}
