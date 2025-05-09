import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Room } from "../../room/models/room.model";

interface IBadCreationAttr{
    isAmpty:boolean
    roomId:number
}



@Table({ tableName: "bad", timestamps: false })
export class Bad extends Model<Bad, IBadCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "false",
    description: "kravat holati",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isAmpty: boolean;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
    onDelete: "SET NULL",
  })
  declare roomId: number;

  @BelongsTo(() => Room)
  room: Room;
}

