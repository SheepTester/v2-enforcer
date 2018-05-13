# create channels
```
#proposals
#announcements
```
the above channels I can't change to my liking

keep the old channels though; put them in a category, rename them to `#proposals-legacy` etc. you can disable sending messages if you want

# create roles
```
gunn
paly
honorary PAUSD
leader
judge
enforcer
representative
prisoner
```
ask that `founder` is removed

# commands
prefix: `v2`

don't forget to check for citizenship

if there's an unknown command, don't give an error message

commands are case insensitive

prefix can be dropped in DM's.
## misc
```
v2 help
v2 rules
```
`v2 rules` links to the Basic Rules v2 doc.
## citizens
```
v2 proposal Description of the new rule or whatever.
```
makes a new Proposal for the Reps. use `v2 undo` for Proposals that undo an existing law
```
v2 undo 33 rational
```
makes a new Proposal that aims to undo an existing law. rational is required
```
v2 complain @user rational
```
makes a Complaint for the Judges, but only if the user is of the government
```
v2 run leader I will do this and that.
```
if not in DMs, delete and DM the user to use DMs.

## reps
```
v2 vetoes
v2 unveto 26
```
makes a new Proposal to override a veto. the Leader's vetoes have an ID, which you get from listing by `v2 vetoes`.
```
v2 prevent @user
```
newprops to prevent am enforcer nomination. given user is the nominated enforcer
```
v2 impeach @user
```
newprops to impeach a leader/judge

## leader
```
v2 nominate enforcer @user
v2 nominate judge @user
```
if enforcer, the user is now an enforcer
if judge, newprops
```
v2 veto 32
```
vetoes the given law. outputs a veto.

## enforcer
```
v2 imprison @user 60
v2 unimprison @user
```
imprisons the user for the given number of minutes (optional). anyone can be imprisoned, but imprisonment doesn't really affect one's ability to government
