import { Button, FormControl, FormErrorMessage, FormLabel, Input, RequiredIndicator } from "@vechaiui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
    username: string;
    password: string;
  }

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const handleToggleShowPassword = () => setShowPassword(!showPassword)
  
    const { register, formState: { errors }, handleSubmit } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
      setLoading(true);
      setTimeout(() => {
        alert(JSON.stringify(data));
        setLoading(false);
      }, 500);
    };
    
    return (
      <div className="w-full max-w-xs p-8 space-x-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormControl invalid={Boolean(errors.username)}>
            <FormLabel>
              Username<RequiredIndicator />
            </FormLabel>
            <Input {...register("username", { required: true })} placeholder="Enter your username." />
            {errors.username && errors.username.type === "required" && <FormErrorMessage>Username is required</FormErrorMessage>}
          </FormControl>
  
          <FormControl invalid={Boolean(errors.password)}>
            <FormLabel>
              Password<RequiredIndicator />
            </FormLabel>
            <Input.Group>
              <Input
                className="pr-16"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              <Input.RightElement className="w-16">
                <Button type="button" size="xs" variant="solid" onClick={handleToggleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </Input.RightElement>
            </Input.Group>
            {errors.password && errors.password.type === "required" && <FormErrorMessage>Password is required</FormErrorMessage>}
          </FormControl>
  
          <Button type="submit" variant="solid" color="primary" loading={loading}>Submit</Button>
        </form>
      </div>
    );
}

export default Register