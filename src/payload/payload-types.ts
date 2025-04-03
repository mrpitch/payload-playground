/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    pages: Page;
    posts: Post;
    categories: Category;
    newsletter: Newsletter;
    users: User;
    media: Media;
    'payload-jobs': PayloadJob;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    posts: PostsSelect<false> | PostsSelect<true>;
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    newsletter: NewsletterSelect<false> | NewsletterSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'payload-jobs': PayloadJobsSelect<false> | PayloadJobsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'app-shell': AppShell;
    'e-mail-templates': EMailTemplate;
  };
  globalsSelect: {
    'app-shell': AppShellSelect<false> | AppShellSelect<true>;
    'e-mail-templates': EMailTemplatesSelect<false> | EMailTemplatesSelect<true>;
  };
  locale: 'en' | 'de';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: {
      schedulePublish: TaskSchedulePublish;
      inline: {
        input: unknown;
        output: unknown;
      };
    };
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  slug: string;
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  showPageTitle?: boolean | null;
  layout?: (CopyBlock | ImageTextBlock | QuoteBlock | StageBlock)[] | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CopyBlock".
 */
export interface CopyBlock {
  headline: string;
  showHeadline: boolean;
  copy?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'copy';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageTextBlock".
 */
export interface ImageTextBlock {
  imageLeftOnOdd?: boolean | null;
  items?:
    | {
        tagline?: string | null;
        headline: string;
        copy?: string | null;
        ctaText?: string | null;
        ctaLink?: string | null;
        Image?: (number | null) | Media;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'image-text';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "QuoteBlock".
 */
export interface QuoteBlock {
  quoteHeader: string;
  quoteText?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'quote';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "StageBlock".
 */
export interface StageBlock {
  tagline?: string | null;
  headline: string;
  subline?: string | null;
  copy?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  backgroundImage?: (number | null) | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'stage';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  thumbnail?: (number | null) | Media;
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  layout?: (QuoteBlock | CopyBlock)[] | null;
  relatedPosts?: (number | Post)[] | null;
  categories?: (number | Category)[] | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  title?: string | null;
  slug?: string | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "newsletter".
 */
export interface Newsletter {
  id: number;
  title: string;
  content: {
    slug: string;
    subject: string;
    layout?: QuoteBlock[] | null;
  };
  preview?: {};
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: (number | null) | Media;
  roles?: ('admin' | 'editor' | 'user')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-jobs".
 */
export interface PayloadJob {
  id: number;
  /**
   * Input data provided to the job
   */
  input?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  taskStatus?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  completedAt?: string | null;
  totalTried?: number | null;
  /**
   * If hasError is true this job will not be retried
   */
  hasError?: boolean | null;
  /**
   * If hasError is true, this is the error that caused it
   */
  error?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  /**
   * Task execution log
   */
  log?:
    | {
        executedAt: string;
        completedAt: string;
        taskSlug: 'inline' | 'schedulePublish';
        taskID: string;
        input?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        output?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        state: 'failed' | 'succeeded';
        error?:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        id?: string | null;
      }[]
    | null;
  taskSlug?: ('inline' | 'schedulePublish') | null;
  queue?: string | null;
  waitUntil?: string | null;
  processing?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'posts';
        value: number | Post;
      } | null)
    | ({
        relationTo: 'categories';
        value: number | Category;
      } | null)
    | ({
        relationTo: 'newsletter';
        value: number | Newsletter;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'payload-jobs';
        value: number | PayloadJob;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  meta?:
    | T
    | {
        title?: T;
        image?: T;
        description?: T;
      };
  showPageTitle?: T;
  layout?:
    | T
    | {
        copy?: T | CopyBlockSelect<T>;
        'image-text'?: T | ImageTextBlockSelect<T>;
        quote?: T | QuoteBlockSelect<T>;
        stage?: T | StageBlockSelect<T>;
      };
  publishedAt?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CopyBlock_select".
 */
export interface CopyBlockSelect<T extends boolean = true> {
  headline?: T;
  showHeadline?: T;
  copy?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageTextBlock_select".
 */
export interface ImageTextBlockSelect<T extends boolean = true> {
  imageLeftOnOdd?: T;
  items?:
    | T
    | {
        tagline?: T;
        headline?: T;
        copy?: T;
        ctaText?: T;
        ctaLink?: T;
        Image?: T;
        id?: T;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "QuoteBlock_select".
 */
export interface QuoteBlockSelect<T extends boolean = true> {
  quoteHeader?: T;
  quoteText?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "StageBlock_select".
 */
export interface StageBlockSelect<T extends boolean = true> {
  tagline?: T;
  headline?: T;
  subline?: T;
  copy?: T;
  ctaText?: T;
  ctaLink?: T;
  backgroundImage?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  excerpt?: T;
  thumbnail?: T;
  meta?:
    | T
    | {
        title?: T;
        image?: T;
        description?: T;
      };
  layout?:
    | T
    | {
        quote?: T | QuoteBlockSelect<T>;
        copy?: T | CopyBlockSelect<T>;
      };
  relatedPosts?: T;
  categories?: T;
  publishedAt?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  publishedAt?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "newsletter_select".
 */
export interface NewsletterSelect<T extends boolean = true> {
  title?: T;
  content?:
    | T
    | {
        slug?: T;
        subject?: T;
        layout?:
          | T
          | {
              quote?: T | QuoteBlockSelect<T>;
            };
      };
  preview?: T | {};
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  firstName?: T;
  lastName?: T;
  avatar?: T;
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  _verified?: T;
  _verificationToken?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-jobs_select".
 */
export interface PayloadJobsSelect<T extends boolean = true> {
  input?: T;
  taskStatus?: T;
  completedAt?: T;
  totalTried?: T;
  hasError?: T;
  error?: T;
  log?:
    | T
    | {
        executedAt?: T;
        completedAt?: T;
        taskSlug?: T;
        taskID?: T;
        input?: T;
        output?: T;
        state?: T;
        error?: T;
        id?: T;
      };
  taskSlug?: T;
  queue?: T;
  waitUntil?: T;
  processing?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "app-shell".
 */
export interface AppShell {
  id: number;
  settings: {
    siteName: string;
    siteDescription: string;
  };
  mainNavigation?: {
    navItems?:
      | {
          label: string;
          href: string;
          id?: string | null;
        }[]
      | null;
  };
  legalNavigation?: {
    navItems?:
      | {
          label: string;
          href: string;
          id?: string | null;
        }[]
      | null;
  };
  profileNavigation?: {
    navItems?:
      | {
          label: string;
          href: string;
          id?: string | null;
        }[]
      | null;
  };
  sideBarNavigation?: {
    navItems?:
      | {
          label: string;
          href: string;
          icon: 'layoutDashboard' | 'rocket' | 'dumbbell' | 'tag' | 'image' | 'user' | 'settings' | 'logout';
          id?: string | null;
        }[]
      | null;
  };
  publishedAt?: string | null;
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "e-mail-templates".
 */
export interface EMailTemplate {
  id: number;
  verifyEmail: {
    Template: {
      previewText: string;
      subject: string;
      heading: string;
      salutation: string;
      copy: string;
      buttonLabel: string;
    };
  };
  passwordReset: {
    Template: {
      previewText: string;
      subject: string;
      heading: string;
      salutation: string;
      copy: string;
      buttonLabel: string;
    };
  };
  footer: {
    content: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "app-shell_select".
 */
export interface AppShellSelect<T extends boolean = true> {
  settings?:
    | T
    | {
        siteName?: T;
        siteDescription?: T;
      };
  mainNavigation?:
    | T
    | {
        navItems?:
          | T
          | {
              label?: T;
              href?: T;
              id?: T;
            };
      };
  legalNavigation?:
    | T
    | {
        navItems?:
          | T
          | {
              label?: T;
              href?: T;
              id?: T;
            };
      };
  profileNavigation?:
    | T
    | {
        navItems?:
          | T
          | {
              label?: T;
              href?: T;
              id?: T;
            };
      };
  sideBarNavigation?:
    | T
    | {
        navItems?:
          | T
          | {
              label?: T;
              href?: T;
              icon?: T;
              id?: T;
            };
      };
  publishedAt?: T;
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "e-mail-templates_select".
 */
export interface EMailTemplatesSelect<T extends boolean = true> {
  verifyEmail?:
    | T
    | {
        Template?:
          | T
          | {
              previewText?: T;
              subject?: T;
              heading?: T;
              salutation?: T;
              copy?: T;
              buttonLabel?: T;
            };
      };
  passwordReset?:
    | T
    | {
        Template?:
          | T
          | {
              previewText?: T;
              subject?: T;
              heading?: T;
              salutation?: T;
              copy?: T;
              buttonLabel?: T;
            };
      };
  footer?:
    | T
    | {
        content?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TaskSchedulePublish".
 */
export interface TaskSchedulePublish {
  input: {
    type?: ('publish' | 'unpublish') | null;
    locale?: string | null;
    doc?:
      | ({
          relationTo: 'pages';
          value: number | Page;
        } | null)
      | ({
          relationTo: 'posts';
          value: number | Post;
        } | null)
      | ({
          relationTo: 'categories';
          value: number | Category;
        } | null);
    global?: 'app-shell' | null;
    user?: (number | null) | User;
  };
  output?: unknown;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}