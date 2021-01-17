import "./App.css";

import { defineAbility1, defineAbility2, defineAbility3, defineAbility4 } from "./defineAbility";
import { Article } from "./entities";

function App() {
  // defineAbility 2
  const user1 = { id: 1, isLoggedIn: false };
  const user2 = { id: 2, isLoggedIn: true };
  const ownArticle1 = new Article({ authorId: user1.id });
  const ownArticle2 = new Article({ authorId: user2.id });
  const ability2_1 = defineAbility2(user1);
  const ability2_2 = defineAbility2(user2);

  // defineAbility 3
  const user3 = { id: 1 };
  const ability3 = defineAbility3(user3);
  const publishedArticle = new Article({ published: true });
  const notPublishedArticle1 = new Article({ published: false });
  const notPublishedArticle2 = new Article({ published: false, sharedWith: 1 });

  // defineAbility 4
  const moderator1 = { id: 2, isModerator: true };
  const moderator2 = { id: 10, isModerator: true };
  const ownArticle = new Article({ authorId: moderator1.id });
  const foreignArticle = new Article({ authorId: 10 });
  const ability4_1 = defineAbility4(moderator1);
  const ability4_2 = defineAbility4(moderator2);

  return (
    <div className="App">
      <h3>defineAbility 1:</h3>
      <span className="Bold-text">1. can manage: all</span>
      <span className="Bold-text">2. cannot delete: User</span>
      <br />
      <div className="Text">
        - read Post: {defineAbility1.can("read", "Post").toString()}
      </div>
      <div className="Text">
        - read User: {defineAbility1.can("read", "User").toString()}
      </div>
      <div className="Text">
        - update User: {defineAbility1.can("update", "User").toString()}
      </div>
      <div className="Text">
        - delete User: {defineAbility1.can("delete", "User").toString()}
      </div>
      <div className="Text">
        - delete User: {defineAbility1.cannot("delete", "User").toString()}
      </div>

      <h3>defineAbility 2:</h3>
      <span className="Bold-text">1. can read: Article</span>
      <br />
      <div className="Text">
        - read Article (user1): {ability2_1.can("read", "Article").toString()}
      </div>
      <div className="Text">
        - update Article (user1):{" "}
        {ability2_1.can("update", "Article").toString()}
      </div>
      <div className="Text">
        - read Article (user2): {ability2_2.can("read", "Article").toString()}
      </div>
      <div className="Text">
        - update Article (user2):{" "}
        {ability2_2.can("update", "Article").toString()}
      </div>
      <div className="Text">
        - update ownArticle1 (user1 & isLoggedIn = false):{" "}
        {ability2_1.can("update", ownArticle1).toString()}
      </div>
      <div className="Text">
        - update ownArticle1 (user2 & isLoggedIn = true):{" "}
        {ability2_2.can("update", ownArticle1).toString()}
      </div>
      <div className="Text">
        - update ownArticle2 (user2 & isLoggedIn = true):{" "}
        {ability2_2.can("update", ownArticle2).toString()}
      </div>

      <h3>defineAbility 3:</h3>
      <span className="Bold-text">1. can read: Article</span>
      <br />
      <div className="Text">
        - read Article (published):{" "}
        {ability3.can("read", publishedArticle).toString()}
      </div>
      <div className="Text">
        - read Article (not published):{" "}
        {ability3.can("read", notPublishedArticle1).toString()}
      </div>
      <div className="Text">
        - read Article (not published & shared):{" "}
        {ability3.can("read", notPublishedArticle2).toString()}
      </div>

      <h3>defineAbility 4:</h3>
      <span className="Bold-text">1. can read: Article</span>
      <span className="Bold-text">2. can read: Article (specified)</span>
      <span className="Bold-text">2. can update: Article (isModerator = true & published)</span>
      <br />
      <div className="Text">
        - update Article (published):{" "}
        {ability4_1.can("update", 'Article', 'published').toString()}
      </div>
      <div className="Text">
        - update ownArticle (published):{" "}
        {ability4_1.can("update", ownArticle, 'published').toString()}
      </div>
      <div className="Text">
        - update ownArticle (published & ability4_1):{" "}
        {ability4_1.can("update", foreignArticle, 'title').toString()}
      </div>
      <div className="Text">
        - update ownArticle (published & ability4_2):{" "}
        {ability4_2.can("update", foreignArticle, 'title').toString()}
      </div>
    </div>
  );
}

export default App;
