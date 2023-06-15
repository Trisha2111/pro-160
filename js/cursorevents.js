AFRAME.registerComponent("cursor-listener",{
    schema:{
        selectedItemId:{default:"",type:"string"}
    },
    
    init:function(){
        this.handleMouseEnter()
        this.handleMouseLeave()
        this.handleClickEvents()
    },

    handleMouseEnter:function(){
        this.el.addEventListener("mouseenter",()=>{
            this.handlePlaces()
        })
    },

    handlePlaces:function(){
        const id=this.el.getAttribute("id")
        const placesid=["taj-mahal","budapest","new-york-city","eiffel-tower"]
        if(placesid.includes(id)){
           const placescontainer=document.querySelector("#places-container") 
           placescontainer.setAttribute("cursor-listener",{selectedItemId:id })
           this.el.setAttribute("material",{color:"black",opacity:1})
        }
    },
    handleMouseLeave:function(){
        this.el.addEventListener("mouseleave",()=>{
            const selectedId=this.data.selectedItemId
            if(selectedId){
                const el=document.querySelector(`#${selectedId}`)
                const id=el.getAttribute("id")
                if(id==selectedId){
                    el.setAttribute("material",{color:"white",opacity:1})
                }
            }
        })
    },
    handleClickEvents:function(){
        this.el.addEventListener("click",x=>{
            const placescontainer=document.querySelector("#places-container")
            const {state}=placescontainer.getAttribute("tour")
            if(state=="places-list"){
                const id=this.el.getAttribute("id")
                const placesid=["taj-mahal","budapest","new-york-city","eiffel-tower"]
                if(placesid.includes(id)){
                    placescontainer.setAttribute("tour",{state:"view",selectedCard:id})
                }
            }
            if(state=="view"||state=="change-view"){
                this.handleViewState()
            }
        })
    },
    handleViewState:function(){
        const el=this.el
        const id=el.getAttribute("id")
        const placescontainer=document.querySelector("#places-container")
        const {selectedItemId}=placescontainer.getAttribute("cursor-listener")
        const helicopterid=["place-1","place-2","place-3","place-4"]
        if(helicopterid.includes(id)){
            placescontainer.setAttribute("tour",{state:"change-view"})
            const sky=document.querySelector("#main-container")
            sky.setAttribute("material",{
                src:`./assets/360_images/${selectedItemId}/${id}.jpg`,
                color:"white"
            })
        }

    }
})