export interface AppVersions {
	currentVersion: number;
	minimalVersion: number;
	operatingSystem: string;
	clientVersion: string;
}

export interface AppVersionUpdate {
	currentVersion: number;
	minimalVersion: number;
	clientVersion: string;
}