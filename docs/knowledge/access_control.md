# Computer access Control

Access control is a method of guaranteeing that users are who they say they are and that they have the appropriate access to an authorised resources.

Two mechanisms: Locks and Login

- Locks: using a physical object (card, fingerprint,...) to identify and retrive their owner's data.
- Login: using a unique username and a matching password.

## Access Control Model

Computer system handles multiple sources,
such as, memory, disk, network interface, and printer (Object). The user (Subject) to those
resources of a computer system.

![](https://github.com/ngankhanh98/coursebox-server/blob/dev/docs/img/access_control_model.jpg?raw=true)

Access-control models tend to fall into one of two classes: those based on **capabilities** and those based on **access control lists (ACLs)**

## Access control lists

- File: user_1:ORW, user_2:R
- Test.txt: user_1:R, user_2:R, admin:ORW
- c_comp: user_1:X, user_2:X , admin:OX
- sys_clk: user_1:R, user_2:R , admin:ORW
- printer: user_1:W, user_2:W , admin.

## Role-Based Access Control

Users are assigned to the role. Objects are
assigned to groups

![](https://github.com/ngankhanh98/coursebox-server/blob/dev/docs/img/rbac.jpg?raw=true)

In many organizations, the end users do not `own` the information for which they are
allowed access. For these organizations, the corporation or agency is the actual `owner`
of system objects as well as the programs that process it. Control is often based on
employee functions rather than data ownership.

Access control decisions are often determined by the roles individual users take on as part
of an organization. The users cannot pass access
permissions on to other users at their discretion.

### Best practice

One of RBAC's greatest virtues is the administrative capabilities it
supports.
When a new person enters the organization, the administrator simply grants membership
to an existing role. When a person's function changes within the organization, the user
membership to his existing roles can be easily deleted and new ones granted.

## Attribute-based access control

Rather than basing access control decisions on a user’s identity, like the traditional methods,
ABAC bases access control on the attributes of access control entities.

These attributes are classified into: 
- User Attributes
- Object Attributes
- Environmental Attributes
- Connection Attributes
- Administrative Attributes

ABAC bases access control on the result of a Boolean statement comparing attributes, for example `user.age >= 18 OR object.owner == user.id or TIME > 8:00AM AND TIME
< 5:00PM`

As new subjects join the organization, rules
and objects do not need to be modified (e.g., all Nurse Practitioners in the Cardiology
Department are assigned those attributes)


## Role-bases access control and Attribute-bases access control 

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2402_RC03/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"attribute based access control","geo":"","time":"today 12-m"},{"keyword":"role based access control","geo":"","time":"today 12-m"}],"category":0,"property":""}, {"exploreQuery":"q=attribute%20based%20access%20control,role%20based%20access%20control&date=today 12-m,today 12-m","guestPath":"https://trends.google.com:443/trends/embed/"}); </script> 

## Implication

### Problem
S(Subject), O(Object), R(Read), W(Write) will be use for short.

There are 3 subjects: User, Member, Teacher
- User: who have registered to the system as a user, not yet enroll courses
- Member: who have registered to the system as a user, and enrolled courses
- Teacher: who have registerd to system as a teacher

There are objects: Courses, Tags, Participants, Classifies. Who can access an entity can access its children.
- Courses are courses,
- Tags are tags,
- Participants: indicates who go to which course (including teacher and member)
- Classifies: indicates which tags go with which courses


```
User(S) -----R----> Courses(O)
User(S) -----R----> Tags(O)

Member(S) ------R----> Courses(O)
Member(S) ------R----> Tags(O)
Member(S) -----R,W---> Participants(O) (in context of the course he's in)
Member(S) ------R----> Classifies(O) 

Teacher(S) -----W,R----> Courses(O)
Teacher(S) ------R-----> Tags(O)
Teacher(S) -----R,W----> Participants(O) (in context of the course he created)
Teacher(S) -----R,W----> Classifies(O) (in context of the course he created)
```
![](https://github.com/ngankhanh98/coursebox-server/blob/dev/docs/diagrams/access_control.png?raw=true)
![](https://github.com/ngankhanh98/coursebox-server/blob/dev/docs/diagrams/erd/erd.concept.png?raw=true)
![](https://github.com/ngankhanh98/coursebox-server/blob/dev/docs/diagrams/erd/erd.v0.4.png?raw=true)
