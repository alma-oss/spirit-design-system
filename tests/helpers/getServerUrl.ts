import { isTesting as isTestingEnvironment } from '@alma-oss/spirit-common/constants/environments';
import { SERVERS, getDevelopmentEndpointUri, type PackageName } from '@alma-oss/spirit-common/constants/servers';

export const getServerUrl = (packageName: string) => (
  isTestingEnvironment()
    ? SERVERS.TESTING[packageName]
    : getDevelopmentEndpointUri(packageName as PackageName, { isDocker: true })
);
