//TODO : ADD SECRET KET TO environment Variable 
interface AppConfig {
  secret: string;
}

const config: AppConfig = {
  secret: "secret_KEK",
};

export default config;
