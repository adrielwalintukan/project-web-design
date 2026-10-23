import { Config } from "@remotion/cli/config";

// Port tetap supaya tidak bentrok dengan dev server Vite aplikasi (5173/4173).
Config.setPort(3133);
