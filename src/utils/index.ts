import { maxSatisfying as SemverMaxSatisfying } from 'semver'
import { NPMPackage } from "../types";

const getLink = function(name: string) {
    return process.env.REGISTRY_URL + name;
}

const getVersion = function(npmPackage: NPMPackage, version: string) {
    if ( npmPackage['dist-tags'][version] ) {
        const packageVersion = npmPackage['dist-tags'][version];
        if ( ! npmPackage.versions[packageVersion]) {
            return false;
        }

        return npmPackage.versions[packageVersion];
    }

    const packageVersion = SemverMaxSatisfying(Object.keys(npmPackage.versions), version);

    if ( ! packageVersion || ! npmPackage.versions[packageVersion] ) {
        return false;
    }
    
    return npmPackage.versions[packageVersion];
}

export {
    getLink,
    getVersion
}