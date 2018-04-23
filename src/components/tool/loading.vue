<template>
  <div class="all">
    <div class="spinner">
    </div>
  </div>
</template>
<style>
  .all{
    width: 100%;
    height: 100%;
    background: black;
    position: fixed;
    z-index: 99;
    opacity: 0.7;
  }
  .spinner {
    position: absolute;
    z-index: 10000;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background-color: #67CF22;
    -webkit-animation: rotateplane 1.2s infinite ease-in-out;
    animation: rotateplane 1.2s infinite ease-in-out;
  }

  @-webkit-keyframes rotateplane {
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
  }

  @keyframes rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
    } 50% {
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
      } 100% {
          transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
          -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        }
  }
</style>
