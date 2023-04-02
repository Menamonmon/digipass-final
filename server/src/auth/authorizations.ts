import { Authorized } from "type-graphql";
import {
  applyResolversEnhanceMap,
  ResolversEnhanceMap,
} from "../../prisma/generated/type-graphql";

// Outline of permissions and authorizations

/* 
A teacher can do the following:
* CRUD classrooms that they created
* Read passes
* Update passes (aceepting or rejecting passes)
* Read students only if they're in their classrooms
*/

/*
A student can do the following:
* Create a bare pass with the following
	* the student's information
    * reason
	* the class information
* Read passes
* Read any pass that they created regardless of its status
* Read a barebone version of the classes they're in or 
  the ones for which they're requesting a pass for the first time
*/

const resolversEnhanceMap: ResolversEnhanceMap = {
  Classroom: {
    createOneClassroom: [Authorized("teacher")],
  },
};

applyResolversEnhanceMap(resolversEnhanceMap);
