AFRAME.registerComponent("tour",{

    schema:{
        state:{type:"string",default:"places-list"},
        selectedCard:{type:"string",default:"#card1"}
    },
    init:function(){
        this.placescontainer=this.el
        this.createCards()
    },
    tick:function(){
        const {state}=this.el.getAttribute("tour")
        if(state=="view"){
            this.hide([this.placescontainer])
            this.showview()
        }
    },
    hide:function(ellist){
        ellist.map(x=>{
            x.setAttribute("visible",false)
        })
    },
    showview:function(){
        const {selectedCard}=this.data
        const sky=document.querySelector("#main-container")
        sky.setAttribute("material",{
            color:"white",
            src:`./assets/360_images/${selectedCard}/place-0.jpg`
        })
    },
    createCards:function(){
        const thumbnails=[
            {id:"taj-mahal",title:"TAJ MAHAL",url:"./assets/thumbnails/taj_mahal.png"},
            {id:"budapest",title:"BUDAPEST",url:"./assets/thumbnails/budapest.jpg"},
            {id:"eiffel-tower",title:"EIFFEL TOWER",url:"./assets/thumbnails/eiffel_tower.jpg"},
            {id:"new-york-city",title:"NEWYORK CITY",url:"./assets/thumbnails/new_york_city.png"},
        ]
        let xpos= -60
        for (var i of thumbnails){
            const posX=xpos+25
            const posY=10
            const posZ=-40
            const position={x:posX,y:posY,z:posZ}
            xpos=posX

            const border=this.createBorder(position,i.id)
            const thumbnail=this.createThumbnail(i)
            border.appendChild(thumbnail)
            const title=this.createTitle(position,i)
            border.appendChild(title)
            this.placescontainer.appendChild(border)
        }
    },
    createBorder:function(position,id){
        const entity=document.createElement("a-entity")
        entity.setAttribute("id",id)
        entity.setAttribute("visible",true)
        entity.setAttribute("geometry",{primitive:"ring",radiusInner:9,radiusOuter:10})
        entity.setAttribute("position",position)
        entity.setAttribute("material",{color:"white",opacity:1})
        entity.setAttribute("cursor-listener",{})
        return entity
    },

    createThumbnail:function(i){
        const entity=document.createElement("a-entity")
        entity.setAttribute("visible",true)
        entity.setAttribute("geometry",{primitive:"circle",radius:9})
        entity.setAttribute("material",{src:i.url})

        return entity
    },

    createTitle:function(position,i){
        const entity=document.createElement("a-entity")
        entity.setAttribute("visible",true)
        const pos=position
        pos.y=-20

        entity.setAttribute("position",pos)
        entity.setAttribute("text",{
            font:"exo2bold",
            align:"center",
            width:70,
            color:"white",
            value:i.title
        })

        return entity
    }
})
