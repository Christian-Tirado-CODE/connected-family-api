class FamilyMember {
    constructor(id, name, dob, relationship){
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.relationship = relationship;
    }

    id(){
        return this.id;
    }

    name(){
        return this.name;
    }
    dob(){
        return this.relationship;
    }
   relationship(){
    return this.relationship;
   }
}

export default FamilyMember;