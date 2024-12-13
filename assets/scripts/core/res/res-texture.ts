import { assetManager, loader } from "cc";

const ParallelMaxTextures = 10

let allTextures: string[] = [
    "CyborgEnemy01_BC", "CyborgEnemy01_N", "CyborgEnemy01_ORM", "CyborgEnemy02_BC", "CyborgEnemy02_N", "CyborgEnemy02_ORM", "DefaultMaterial_BaseColor", "DefaultMaterial_MetallicRoughness", "DefaultMaterial_Normal", "MI_AirConditioners01_BaseColor", "MI_AirConditioners01_MetallicRoughness", "MI_AirConditioners01_Normal", "MI_AirConditioners01_Occlusion", "MI_AirConditioner_Decal01_BaseColor", "MI_AirConditioner_Decal01_MetallicRoughness", "MI_AirConditioner_Decal01_Normal", "MI_AirConditioningPipe_01_BaseColor", "MI_AirConditioningPipe_01_MetallicRoughness", "MI_AirConditioningPipe_01_Normal", "MI_AirConditioningPipe_01_Occlusion", "MI_AirConditioning_01_BaseColor", "MI_AirConditioning_01_MetallicRoughness", "MI_AirConditioning_01_Normal", "MI_AirConditioning_01_Occlusion", "MI_CarsEmissive_Emissive", "MI_ContainerP4_01_BaseColor", "MI_ContainerP4_01_MetallicRoughness", "MI_ContainerP4_01_Normal", "MI_ContainerP4_01_Occlusion", "MI_EnvirAssets_01_Emissive", "MI_Fence_01_BaseColor", "MI_Fence_01_MetallicRoughness", "MI_Fence_01_Normal", "MI_Fence_01_Occlusion", "MI_FrontConcrete01_BaseColor", "MI_FrontConcrete01_MetallicRoughness", "MI_FrontConcrete01_Normal", "MI_FrontConcrete02_BaseColor", "MI_FrontConcrete02_MetallicRoughness", "MI_FrontConcrete02_Normal", "MI_FrontConDec03_BaseColor", "MI_FrontConDec03_MetallicRoughness", "MI_FrontConDec04_BaseColor", "MI_Glass03_BaseColor", "MI_Glass_02_BaseColor", "MI_LampSet02_Emissive", "MI_MetalBeam01_BaseColor", "MI_MetalBeam01_MetallicRoughness", "MI_MetalBeam01_Normal", "MI_MetalBeam01_Occlusion", "MI_MetalBeam_Painted01_BaseColor", "MI_MetalBumpers_BaseColor", "MI_MetalBumpers_MetallicRoughness", "MI_MetalBumpers_Normal", "MI_MetalBumpers_Occlusion", "MI_MetalWallPart_01_BaseColor", "MI_MetalWallPart_01_MetallicRoughness", "MI_MetalWallPart_01_Normal", "MI_MetalWallPart_01_Occlusion", "MI_MetalWallPart_Painted_01_BaseColor", "MI_PaperBoxes_01_BaseColor", "MI_PaperBoxes_02_BaseColor", "MI_PillarWithBreckets_BaseColor", "MI_PillarWithBreckets_MetallicRoughness", "MI_PillarWithBreckets_Normal", "MI_PillarWithBreckets_Occlusion", "MI_Pipes_square_01_BaseColor", "MI_Pipes_square_01_MetallicRoughness", "MI_Pipes_square_01_Normal", "MI_Pipes_square_01_Occlusion", "MI_Platform01_BaseColor", "MI_Platform01_MetallicRoughness", "MI_Platform01_Normal", "MI_Platform01_Occlusion", "MI_Platform02_BaseColor", "MI_Platform02_MetallicRoughness", "MI_Platform02_Normal", "MI_Platform02_Occlusion", "MI_PlatformRailing_01_BaseColor", "MI_PlatformRailing_01_MetallicRoughness", "MI_PlatformRailing_01_Normal", "MI_PlatformRailing_01_Occlusion", "MI_Platform_01_BaseColor", "MI_Platform_01_MetallicRoughness", "MI_Platform_01_Normal", "MI_Platform_01_Occlusion", "MI_PowderStorage_01_BaseColor", "MI_PowderStorage_01_MetallicRoughness", "MI_PowderStorage_01_Normal", "MI_PowderStorage_01_Occlusion", "MI_PropsSetEm01_BaseColor", "MI_PropsSetEm01_Emissive", "MI_PropsSetEm01_MetallicRoughness", "MI_PropsSetEm01_Normal", "MI_PropsSetEm01_Occlusion", "MI_Round_Pipes_01_BaseColor", "MI_Round_Pipes_01_MetallicRoughness", "MI_Round_Pipes_01_Normal", "MI_Round_Pipes_01_Occlusion", "MI_Signboards02_Emissive", "MI_SignboardText02_Emissive", "MI_Stair_01_Painted_BaseColor", "MI_Stair_02_BaseColor", "MI_Stair_02_MetallicRoughness", "MI_Stair_02_Normal", "MI_Stair_02_Occlusion", "MI_WGS_01_Emissive", "MI_WGS_03_Emissive", "M_AnimBoard01_BaseColor", "M_AnimBoard01_Emissive", "M_Building08_Emissive", "M_Hair_Alpha_BaseColor", "M_LampSet_01_Emissive", "M_Signboards01_Emissive", "M_SignboardsAnim03_Emissive", "M_Sky_Panning_Clouds2_Inst_Sky_BaseColor", "M_WindowsEmissive01_Emissive", "T_Asphalt03_BC", "T_Asphalt03_Normal", "T_Asphalt03_ORM", "T_Asphalt_BC", "T_Asphalt_Normal", "T_Asphalt_ORM", "T_BackgroundBuildingTrim01_BC", "T_BackgroundBuildingTrim01_N", "T_BackgroundBuildingTrim01_ORM", "T_BrokenAsphalt_BC", "T_BrokenAsphalt_N", "T_BrokenAsphalt_ORM", "T_Building05_BC", "T_Building05_N", "T_Building05_ORM", "T_Building07_BC", "T_Building07_BC_1", "T_Building07_N", "T_Building07_N_1", "T_Building07_ORM", "T_Building07_ORM_1", "T_Building08_BC", "T_Building08_N", "T_Building08_ORM", "T_Building09_BC", "T_Building09_N", "T_Building09_ORM", "T_Building10_BC", "T_Building10_N", "T_Building10_ORM", "T_Building12_BC", "T_Building12_N", "T_Building12_ORM", "T_Building13_BC", "T_Building13_N", "T_Building13_ORM", "T_Building4_BC", "T_Building4_N", "T_Building4_ORM", "T_car_BC", "T_car_Emiss", "T_car_N", "T_car_ORM", "T_Concrete_Poured_D", "T_Concrete_Poured_N", "T_CornerBuilding01_BC", "T_CornerBuilding01_N", "T_CornerBuilding01_ORM", "T_CyberSignBoards_BC_sRGB", "T_CyberSignBoards_N", "T_CyberSignBoards_ORM", "T_EnvirAssets01_BC_sRGB", "T_EnvirAssets01_N", "T_EnvirAssets01_ORM", "T_FactoryConcreteFloor01_BC", "T_FloorMats01_BC", "T_FloorMats01_N", "T_FloorMats01_ORM", "T_GarbageBag02_BC", "T_GarbageBag02_N", "T_GarbageBag02_ORM", "T_gun01_BC_sRGB", "T_gun01_N", "T_gun01_ORM", "T_gun03_BC", "T_gun03_N", "T_gun03_ORM", "T_Hair_BC", "T_Hair_N", "T_Hair_ORM", "T_Hero_Body_BC", "T_Hero_Body_N", "T_Hero_Body_ORM", "T_Hero_Head_BC", "T_Hero_Head_N", "T_Hero_Head_ORM", "T_LampSet02_BC", "T_LampSet02_N", "T_LampSet02_ORM", "T_LampSet_01_BC", "T_LampSet_01_N", "T_LampSet_01_ORM", "T_Metalbeam01_N", "T_Metalbeam01_ORM", "T_NeonSign02_BC", "T_NeonSign02_N", "T_NeonSign02_ORM", "T_PaperBoxes_01_N", "T_PaperBoxes_01_ORM", "T_PaperBoxes_02_N", "T_PaperBoxes_02_ORM", "T_PaperBoxes_03_BC", "T_PaperBoxes_03_N", "T_PaperBoxes_03_ORM", "T_Pavement01_BC", "T_Pavement01_N", "T_Pavement01_ORM", "T_PavementDetails01_BC", "T_PavementDetails01_N", "T_PavementDetails01_ORM", "T_PropsSet01_BC", "T_PropsSet01_N", "T_PropsSet01_ORM", "T_Roof01_BC", "T_Roof01_N", "T_Roof01_ORM", "T_SignboardText01_BC", "T_SignboardText01_N", "T_SignboardText01_ORM", "T_Stairs_02_N", "T_Stairs_02_ORM", "T_TiledGexGround01_BC", "T_TiledGexGround01_N", "T_TiledGexGround01_ORM", "T_TrashBox01_BC", "T_TrashBox01_N", "T_TrashBox01_ORM", "T_TrimSet02_BC", "T_TrimSet02_N", "T_TrimSet02_ORM", "T_TrimSheet01_BC", "T_TrimSheet01_N", "T_TrimSheet01_ORM", "T_WallTile01_BC", "T_WallTile01_N", "T_WallTile01_ORM", "T_Wall_01_N", "T_Wall_01_ORM", "T_WGS_01_BC_sRGB", "T_WGS_01_N", "T_WGS_01_ORM", "T_WGS_02_BC_sRGB", "T_WGS_02_N", "T_WGS_02_ORM", "T_WGS_03_BC_sRGB", "T_WGS_03_N", "T_WGS_03_ORM", "T_WGS_04_BC_sRGB", "T_WGS_04_N", "T_WGS_04_ORM", "T_WindowsSet01_BC", "T_WindowsSet01_N", "T_WindowsSet01_ORM", "Wall03_BC", "Wall03_Normal", "Wall03_ORM", "WorldGridMaterial_BaseColor", "WorldGridMaterial_MetallicRoughness", "WorldGridMaterial_Normal",
]

export async function loadTextures () {
    let some = allTextures.splice(0, ParallelMaxTextures);

    await Promise.all(some.map(async u => {
        u = 'textures/' + u
        new Promise(resolve => {
            loader.loadRes(u, (err, a) => {
                resolve(null)
            })
        })
    }))

    if (allTextures.length) {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(null)
            }, 60)
        })

        await loadTextures()
    }
}