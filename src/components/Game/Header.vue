<template>
    <div class="daily--tip">
        <div class="daily--tip-wrapper">
          <div class="overlay"></div>
			<div
				class="header"
			>
				<div class="w-100">
					<div class="d-flex" v-if="dataLineup.condition">
						<div 
							class="weather--icon"
						>
							<v-img
								:src="dataLineup.condition.icon"
							>
							</v-img>                
						</div>

						<div
							class="weather--info"
						>
							<h6>
								{{ dataLineup.condition.temp }}°C 
									<span style="opacity:.2">|</span> 
								{{ dataLineup.condition.humidity }}
							</h6>
							<p class="mb-0">
								{{ dataLineup.condition.type }}
							</p>
						</div>
					</div>
				
					<!-- Stadium details -->
					<div class="d-flex mt-6">
						<div 
							class="weather--icon stadium"
						>
							<img src="../../assets/games/stadium.png" style="width: 25px">          
						</div>

						<div
							class="weather--info"
						>
							<h6>
								{{ dataLineup.venue.name }}
							</h6>
							<p class="mb-0">
								{{ dataLineup.venue.capacity }}
							</p>
						</div>
					</div>
				
				</div>

				<div class="w-100">
					<div class="game--score">

						<div class="league">
							<h3>
								{{ dataLineup.country }}
								<span>
								{{ dataLineup.league }}
								</span>
							</h3>
						</div>

						<div class="score">
							<h1 class="text-center">
								{{ dataHome.goals }} - {{ dataAway.goals }}
								<small class="text-center d-block">
								{{ dataLineup.minute }}'
								<span
									v-show="dataLineup.injury_time != null"
								>
									{{ dataLineup.injury_time }}
								</span>
								</small>

								<span class="d-block referre">
									{{ dataLineup.referee }}
								</span>
							</h1>
						</div>
						
					</div>
				
				</div>

				<!-- Right Side -->

				<div class="w-100">
					<div class="cta-button">
						<v-btn
							color="primary"
							depressed
							small
						>
							Add tips
						</v-btn>
					</div>
				</div>

			</div>

          	<div class="team--wrapper">
				<v-row>
					<v-col
						md="3"
					>
						<div class="team--box home">

						<div 
							class="team--logo"
						>

							<v-img
								:src="dataHome.logo"
							>
							</v-img>

						</div>

						<div
							class="team--text"
						>
							<h4>
								{{ dataHome.name }}
								<team-form
									:form="dataHome.recent_form"
									v-if="dataHome.recent_form"
								></team-form>
							</h4>
						</div>
						
						</div>
					</v-col>

					<v-col
						md="6"
					>

						<timeline-graph
							:minute="dataLineup.minute"
							:injury="dataLineup.injury_time"
							:extraTime="dataLineup.extra_time"
							:key="dataLineup.minute"
						></timeline-graph>
					</v-col>

					<v-col
						md="3"
					>
						<div class="team--box away">

							<div 
								class="team--logo"
							>

								<v-img
									:src="dataAway.logo"
								>
								</v-img>

							</div>

							<div
								class="team--text"
							>
								<h4>
									{{ dataAway.name }}
									<team-form
										:form="dataAway.recent_form"
										v-if="dataAway.recent_form"
									></team-form>
								</h4>
							</div>
							
						</div>
					</v-col>
				</v-row>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameHeader",

    props: {
      dataLineup: {
        type: Object
      },
      dataHome: {
        type: Object
      },
      dataAway: {
        type: Object
      }
    },

    components: {
		teamForm: () => import("../General/TeamFormGraphic"),
		timelineGraph: () => import("./TimelineGraph")
    }
}
</script>

<style scoped>
.daily--tip {
  background: url("../../assets/games/back.jpg") no-repeat 50% 30%;
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
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1em;
  position: relative;
}

.header {
  display: flex;
  width: 100%;
  z-index: 10;
}

.weather--icon {
  object-fit: contain;
  width: 40px;
  height: 40px;
  padding: .2em;
  border-radius: 10px;
  background-color: var(--theme-dark-10);
  text-align: center;
}

.weather--icon.stadium {
    padding: .5em;
}
.weather--info {
  margin-left: 1em;
}

.weather--info h6 {
  font-weight: 600;
  font-size: 14px;
}
.weather--info p {
  font-size: 12px;
  color: var(--theme-dark-30);
  opacity: .5;
  text-transform: uppercase;
}
.team--wrapper {
  margin-top: auto;
  width: 100%;
}

.team--box {
  display: flex;
  width: 100%;
  margin-top: auto;
  flex-direction: column;
}

.team--box.home {
   align-items: flex-start;
     padding-left: 1em;
}

.team--box.away {
  align-items: flex-end;
  padding-right: 1em;
}

.team--logo {
  object-fit: contain;
  width: 70px;
  height: 70px;
  padding: .6em;
  border-radius: 50%;
  background-color: var(--theme-dark-60);
}

.team--text {
  z-index: 10;
}

.team--text h4 {
  font-weight: 400;
}

.team--text h4 > small {
  display: block;
  opacity: .5;
}

.game--score {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.league h3 {
  font-weight: 600;
  opacity: 1;
  text-align: center;
  font-size: 16px;
}

.league h3 > span {
  font-weight: 400;
  opacity: .6;
  display: block;
  margin-bottom: 1em;
  font-size: 14px;
}

.score h1 small {
  font-size: 60%;
  font-weight: 400;
}

.score h1 small > span{
  font-size: 12px;
  font-weight: 400;
  opacity: .6;
}

.cta-button {
  display: flex;
  justify-content: flex-end;
  padding-right: 1em;
}

.referre {
    font-size: 12px;
    text-transform: initial;
    font-weight: 300;
    margin-top: 1em;
}
</style>