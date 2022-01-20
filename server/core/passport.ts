import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import { User } from "../../models";

console.log(User, 111);

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3002/auth/github/callback",
    },

    async (_: unknown, __: unknown, profile, done) => {
      try {
        const obj = {
          fullname: profile.displayName,
          avatarUrl: profile.photos?.[0].value,
          isActive: 0,
          username: profile.username,
          phone: "",
        };


        const findUser = await User.findOne(
          {where: {
            username: obj.username
          }}
        );

        if (!findUser) {
          const user = await User.create(obj);
          return done(null, user);
        } 
        console.log(findUser)

        done(null, findUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id); 
 // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

export { passport };
