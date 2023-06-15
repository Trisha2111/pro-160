AFRAME.registerComponent("side-view",{
    init:function(){
        this.createPlaces()
    },
    createPlaces:function(){
        const viewcontainer=document.querySelector("#view-container")
        let xpos=-150
        let ypos=30

        for (var i=1;i<=4;i++){
            const position={
                x:xpos+=50,
                y:ypos+=2,
                z:-40
            }
            const entity=this.createHelicopter(position,i)
            viewcontainer.appendChild(entity)

        }
    },
    createHelicopter:function(position,i){
        const entity=document.createElement("a-entity")
        entity.setAttribute("visible",true)
        entity.setAttribute("id",`place-${i}`)
        entity.setAttribute("geometry",{primitive:"circle",radius:2.5})
        entity.setAttribute("material",{src:"./assets/helicopter.png",opacity:0.9})
        entity.setAttribute("position",position)
        entity.setAttribute("cursor-listener",{})
        return entity
    },
    tick:function(){
        const placescontainer=document.querySelector("#places-container")
        const {state}=placescontainer.getAttribute("tour")
        if(state=="view"||state=="change-view"){
            this.el.setAttribute("visible",true)

        }
        else{
            this.el.setAttribute("visible",false)
        }

    }
})