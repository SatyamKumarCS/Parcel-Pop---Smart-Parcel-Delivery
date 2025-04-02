import RegisterForm from '@/components/RegisterForm';
import Page from '../components/Page';
import Section from '../components/Section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LogInForm from '@/components/LogInForm';
import useAuth from '@/hooks/useAuth';

export default function LogInAndRegisterPage() {
    const { user, loading } = useAuth();
    return (
        <Page className="min-h-screen flex items-center justify-center">
            <Section className=" ">
                <div className="flex tablet-lg:flex-col">
                    {/* Left side */}
                    <div className="basis-1/2 text-center p-5">
                        <h1>{loading ? 'Loadig' : user?.user.name}</h1>
                        <h2>Welcome to ParcelPop</h2>
                        <h5>Your Trusted Partner for Hassle-Free Parcel Delivery</h5>
                        <img className="w-10/12 mx-auto" src="/arts/loginpage.svg" alt="" />
                    </div>

                    {/* Right side */}
                    <div className="basis-1/2 flex h-full items-center justify-center">
                        <div className="bg-card dark:bg-dark-card  rounded-lg shadow-lg w-full m-10 overflow-hidden">
                            <Tabs defaultValue="login" className="w-full ">
                                <TabsList className="!w-full !p-0   text-foreground dark:text-dark-foreground rounded-none border-b border-b-border dark:border-b-dark-border bg-card/50 dark:bg-dark-card/50">
                                    <TabsTrigger
                                        value="login"
                                        className="w-full h-10 rounded-none data-[state=active]:bg-secondary"
                                    >
                                        Log In
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="register"
                                        className="w-full h-10 rounded-none data-[state=active]:bg-secondary"
                                    >
                                        Register
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="login">
                                    <LogInForm />
                                </TabsContent>
                                <TabsContent value="register">
                                    <RegisterForm />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </Section>
        </Page>
    );
}
