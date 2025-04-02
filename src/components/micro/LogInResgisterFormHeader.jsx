import LogInWithGoogle from '../LogInWithGoogle';

export default function LogInResgisterFormHeader({ heading }) {
    return (
        <div>
            <div className="flex justify-between">
                <img className="w-36" src="/logos/logo.svg" alt="" />
                <LogInWithGoogle />
            </div>
            <div className="flex items-center gap-4 my-3">
                <hr className="border-b-2 border-muted dark:border-dark-muted w-full rounded-lg" />
                <h1 className="whitespace-nowrap">{heading}</h1>
                <hr className="border-b-2 border-muted dark:border-dark-muted w-full rounded-lg" />
            </div>
        </div>
    );
}
