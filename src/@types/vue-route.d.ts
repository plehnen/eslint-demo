import { RoleEnum } from '@/models/user/RoleEnum';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import type { ComponentPublicInstance } from 'vue';
import type { NavigationGuard } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    beforeResolve?: NavigationGuard;

    roles?: Array<RoleEnum | (() => boolean)>;

    /** Surrounding layout component */
    layout?: PromiseWork<ComponentPublicInstance>;

    /** For navigation and breadcrumb */
    parent?: string;

    /** Icon for top or sidebar navigation (only needed if either `isTopNavigation` or `isSubNavigation` is `true`) */
    icon?: () => Promise<IconDefinition>;

    /** Route is shown in top-navigation */
    isTopNavigation?: boolean;

    /** The navigation item will be shown in the main navigation. */
    isMainNavigation?: boolean;

    /** Route is shown as a sub-navigation (parent must be either sub-navigation or top-navigation) */
    isSubNavigation?: boolean;

    /** When you use `AutoRedirectToFirstNavigationChild` or a vue-router redirect, so the breadcrumb-entry gets disabled and the "go back" on `ErrorView` skips this page */
    isRedirect?: boolean;

    /** Route is shown inside second-sidebar (NOTE: will be grouped via parent!) */
    isTopbarNavigation?: boolean;

    /** Don't show breadcrumb (can only be applied to root level navigation item!) */
    isBreadcrumbHidden?: boolean;

    /** This entry is not clickable */
    isBreadcrumbDisabled?: boolean;

    /** Don't automatically scroll to top on navigation change */
    isScrollUpDisabled?: boolean;

    /** Re-render components for new language */
    refreshOnLanguageChange?: boolean;

    /** Overwrite breadcrumb item for this route with a dedicated component */
    breadcrumbComponent?: PromiseWork<ComponentPublicInstance>;

    /** Activate topbar with a dedicated component */
    childrenTopbarComponent?: PromiseWork<ComponentPublicInstance>;

    /** Allows to set external URL as route */
    overwriteUrl?: string | (() => string);

    /**
     * Indicates whether this route should open in new tab.
     * Works in conjunction with {@link overwriteUrl}.
     */
    shouldOpenInNewTab?: boolean;
  }
}
