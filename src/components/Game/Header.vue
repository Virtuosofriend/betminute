<template>
    <div class="daily--tip">
        <div class="daily--tip-wrapper">
            <div class="overlay"></div>
            <h2>
                {{ $t( `Sidebar.myFeed` ) }}
             </h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameHeader",

}
</script>

<style scoped>
.daily--tip {
  background: url("../../assets/dashboard/dailytip.jpg") no-repeat 50% 30%;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  height: 350px;
  border-radius: 15px;
}

.daily--tip .overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 0;
  height: 350px;
}

.daily--tip-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1em;
  position: relative;
}

.daily--tip-wrapper h2 {
  font-weight: 400;
  z-index: 10;
}
</style>