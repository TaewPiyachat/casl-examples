import { defineAbility } from "@casl/ability";

export const defineAbility1 = defineAbility((can, cannot) => {
  // manage and all are special keywords in CASL. manage represents any action and all represents any subject
  can("manage", "all");
  cannot("delete", "User");
});

export const defineAbility2 = (user) =>
  defineAbility((can) => {
    can("read", "Article");

    if (user.isLoggedIn) {
      can("update", "Article", { authorId: user.id });
      can("create", "Comment");
      can("update", "Comment", { authorId: user.id });
    }
  });

export const defineAbility3 = (user) =>
  defineAbility((can) => {
    // rules are combined by logical OR
    // users can read Article if it's published OR users can read Article if it's not published AND shared with them
    can("read", "Article", { published: true });
    can("read", "Article", { published: false, sharedWith: user.id });
  });

export const defineAbility4 = (user) =>
  defineAbility((can) => {
    // to restrict which fields a user can access. For example, let's allow only moderators to publish Article
    // If fields are not specified, a user is allowed to access any field.
    can("read", "Article");
    can("update", "Article", ["title", "description"], { authorId: user.id });

    if (user.isModerator) {
      can("update", "Article", ["published"]);
    }
  });
