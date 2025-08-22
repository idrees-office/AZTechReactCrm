import { Link } from "react-router";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Logo from "@/assets/appLogo.svg?react";
import { Button, Card, Checkbox, Input, InputErrorMsg } from "@/components/ui";
import { Page } from "@/components/shared/Page";
import { loginUser } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useRef, useState } from "react";

// ----------------------------------------------------------------------

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
 

   const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        try {
            const response = await dispatch(loginUser({ formData }) as any);
            if ([200, 201].includes(response.payload.status)) {
                // toast.success(response.payload.message);
                formRef.current?.reset();
                // navigate('/');
                return;
            }

            if ([401, 400].includes(response.payload.status)) {
                // toast.error(response.payload.message);
                const form = formRef.current;
                if (!form) return;
                const emailInput = form.querySelector<HTMLInputElement>('input[name="client_user_email"]');
                const passwordInput = form.querySelector<HTMLInputElement>('input[name="password"]');
                if (response.payload.message.status === "Incorrect-Password" && passwordInput) {
                    passwordInput.value = "";
                }
                if (response.payload.message.client_user_email === "Incorrect-Email" && emailInput) {
                    emailInput.value = "";
                }
                form.reset();
                return;
            }

            setErrors(response.payload.data);
            formRef.current?.reset();
        } catch (error: any) {
            // Swal.fire('Error:', error.message || error);
        }
    };

  return (
    <Page title="Login">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            <Logo className="mx-auto size-16" />
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-dark-100">
                Welcome Back
              </h2>
              <p className="text-gray-400 dark:text-dark-300">
                Please sign in to continue
              </p>
            </div>
          </div>
          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            <form onSubmit={submitForm} ref={formRef}  autoComplete="off">
              <div className="space-y-4">
                <Input
                  label="Username"
                  name="client_user_email"
                  placeholder="Enter Username"
                  prefix={
                    <EnvelopeIcon className="size-5 transition-colors duration-200" strokeWidth="1"/>
                  }
                />
                 {errors?.client_user_email && <p className="text-danger error">{errors.client_user_email[0]}</p>}
                <Input
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  prefix={
                    <LockClosedIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                />
                 {errors?.password && <p className="text-danger error">{errors.password[0]}</p>}
              </div>

              {/* <div className="mt-2">
                <InputErrorMsg
                  when={(errorMessage && errorMessage !== "") as boolean}
                >
                  {errorMessage}
                </InputErrorMsg>
              </div> */}

              <div className="mt-4 flex items-center justify-between space-x-2">
                <Checkbox label="Remember me"/>
                <a
                  href="##"
                  className="text-xs text-gray-400 transition-colors hover:text-gray-800 focus:text-gray-800 dark:text-dark-300 dark:hover:text-dark-100 dark:focus:text-dark-100"
                >
                  Forgot Password?
                </a>
              </div>

              <Button type="submit" className="mt-5 w-full" color="primary">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-center text-xs-plus">
              <p className="line-clamp-1">
                <span>Dont have Account?</span>{" "}
                <Link
                  className="text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600"
                  to="/pages/sign-up-v1"
                >
                  Create account
                </Link>
              </p>
            </div>
            <div className="my-7 flex items-center space-x-3 text-xs rtl:space-x-reverse">
              <div className="h-px flex-1 bg-gray-200 dark:bg-dark-500"></div>
              <p>OR</p>
              <div className="h-px flex-1 bg-gray-200 dark:bg-dark-500"></div>
            </div>
            <div className="flex gap-4">
              <Button className="h-10 flex-1 gap-3" variant="outlined">
                <img
                  className="size-5.5"
                  src="/images/logos/google.svg"
                  alt="logo"
                />
                <span>Google</span>
              </Button>
              <Button className="h-10 flex-1 gap-3" variant="outlined">
                <img
                  className="size-5.5"
                  src="/images/logos/github.svg"
                  alt="logo"
                />
                <span>Github</span>
              </Button>
            </div>
          </Card>
          <div className="mt-8 flex justify-center text-xs text-gray-400 dark:text-dark-300">
            <a href="##">Privacy Notice</a>
            <div className="mx-2.5 my-0.5 w-px bg-gray-200 dark:bg-dark-500"></div>
            <a href="##">Term of service</a>
          </div>
        </div>
      </main>
    </Page>
  );
}

