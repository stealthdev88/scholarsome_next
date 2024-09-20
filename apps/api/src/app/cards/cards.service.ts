import { Injectable } from "@nestjs/common";
import { PrismaService } from "../providers/database/prisma/prisma.service";
import { Prisma, Card as PrismaCard, CardMedia as PrismaCardMedia } from "@prisma/client";
import { Card, CardMedia } from "@scholarsome/shared";
import * as sharp from "sharp";
import * as crypto from "crypto";
import { StorageService } from "../providers/storage/storage.service";

@Injectable()
export class CardsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService
  ) {}

  /**
   * Scans a string for HTML tags that contain a src,
   * and uploads them to the designated storage destination
   *
   * @param side The string to scan
   * @param setId The ID of the set that the card is apart of
   *
   * @returns The string with updated src values
   */
  async scanAndUploadMedia(side: string, setId: string): Promise<{ scanned: string; media: string[] } | false> {
    const matches = side.match(/<[^>]+src="([^">]+)"/g);

    const media = [];

    if (matches) {
      let sources = Object.values(matches);
      if (!sources) return false;

      sources = sources.map((x) => x.replace(/.*src="([^"]*)".*/, "$1"));

      for (const source of sources) {
        const split: string[] = source.split(",");
        if (split.length === 0 || split.length !== 2) continue;

        let decoded = Buffer.from(split[1], "base64");

        let extension = "." + source.match(/^data:[a-z]+\/([a-z]+);base64,/)[1];

        if (
          split[0].includes("jpeg") ||
          split[0].includes("jpg") ||
          split[0].includes("png") ||
          split[0].includes("tiff") ||
          split[0].includes("webp")
        ) {
          decoded = await sharp(decoded).jpeg({ progressive: true, force: true, quality: 80 }).toBuffer();
          extension = ".jpeg";
        }

        const name = crypto.randomUUID() + extension;
        media.push(name);

        const fileName = setId + "/" + name;

        await this.storageService.getInstance()
            .putFile("media/sets/" + fileName, decoded);

        side = side.replace(source, "/api/sets/" + setId + "/media/" + name);
      }
    } else return false;

    return { scanned: side, media };
  }

  async deleteMedia(setId: string, fileName: string) {
    return await this.storageService.getInstance()
        .deleteFile("media/sets/" + setId + "/" + fileName);
  }

  /**
   * Queries the database for a unique card
   *
   * @param cardWhereUniqueInput Prisma `CardWhereUniqueInput` selector object
   *
   * @returns Queried `Card` object
   */
  async card(
      cardWhereUniqueInput: Prisma.CardWhereUniqueInput
  ): Promise<Card | null> {
    return this.prisma.card.findUnique({
      where: cardWhereUniqueInput,
      include: { set: true, media: true }
    });
  }

  /**
   * Queries the database for multiple cards
   *
   * @param params.skip Optional, Prisma skip selector
   * @param params.take Optional, Prisma take selector
   * @param params.cursor Optional, Prisma cursor selector
   * @param params.where Optional, Prisma where selector
   * @param params.orderBy Optional, Prisma orderBy selector
   *
   * @returns Array of queried `Card` objects
   */
  async cards(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CardWhereUniqueInput;
    where?: Prisma.CardWhereInput;
    orderBy?: Prisma.CardOrderByWithRelationInput;
  }): Promise<Card[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.card.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        set: true,
        media: true
      }
    });
  }

  /**
   * Creates a card in the database
   *
   * @param data Prisma `CardCreateInput` selector
   *
   * @returns Created `Card` object
   */
  async createCard(data: Prisma.CardCreateInput): Promise<PrismaCard> {
    return this.prisma.card.create({
      data
    });
  }

  /**
   * Updates a card in the database
   *
   * @param params.where Prisma where selector
   * @param params.data Prisma data selector
   *
   * @returns Updated `Card` object
   */
  async updateCard(params: {
    where: Prisma.CardWhereUniqueInput;
    data: Prisma.CardUpdateInput;
  }): Promise<PrismaCard> {
    const { where, data } = params;
    return this.prisma.card.update({
      data,
      where
    });
  }


  /**
   * Deletes a card from the database
   *
   * @param where Prisma CardWhereUniqueInput selector
   *
   * @returns `Card` object that was deleted
   */
  async deleteCard(where: Prisma.CardWhereUniqueInput): Promise<PrismaCard> {
    return this.prisma.card.delete({
      where
    });
  }

  /**
   * Queries the database for a unique cardMedia instance
   *
   * @param cardMediaWhereUniqueInput Prisma `CardMediaWhereUniqueInput` selector object
   *
   * @returns Queried `CardMedia` object
   */
  async cardMedia(
      cardMediaWhereUniqueInput: Prisma.CardMediaWhereUniqueInput
  ): Promise<CardMedia | null> {
    return this.prisma.cardMedia.findUnique({
      where: cardMediaWhereUniqueInput,
      include: { card: true }
    });
  }


  /**
   * Queries the database for multiple cardMedia instances
   *
   * @param params.skip Optional, Prisma skip selector
   * @param params.take Optional, Prisma take selector
   * @param params.cursor Optional, Prisma cursor selector
   * @param params.where Optional, Prisma where selector
   * @param params.orderBy Optional, Prisma orderBy selector
   *
   * @returns Array of queried `CardMedia` objects
   */
  async cardMedias(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CardMediaWhereUniqueInput;
    where?: Prisma.CardMediaWhereInput;
    orderBy?: Prisma.CardMediaOrderByWithRelationInput;
  }): Promise<CardMedia[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cardMedia.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        card: true
      }
    });
  }

  /**
   * Creates a cardMedia instance in the database
   *
   * @param data Prisma `CardMediaCreateInput` selector
   *
   * @returns Created `CardMedia` object
   */
  async createCardMedia(data: Prisma.CardMediaCreateInput): Promise<PrismaCardMedia> {
    return this.prisma.cardMedia.create({
      data
    });
  }

  /**
   * Updates a cardMedia instance in the database
   *
   * @param params.where Prisma where selector
   * @param params.data Prisma data selector
   *
   * @returns Updated `CardMedia` object
   */
  async updateCardMedia(params: {
    where: Prisma.CardMediaWhereUniqueInput;
    data: Prisma.CardMediaUpdateInput;
  }): Promise<PrismaCardMedia> {
    const { where, data } = params;
    return this.prisma.cardMedia.update({
      data,
      where
    });
  }


  /**
   * Deletes a cardMedia instance from the database
   *
   * @param where Prisma CardMediaWhereUniqueInput selector
   *
   * @returns `CardMedia` object that was deleted
   */
  async deleteCardMedia(where: Prisma.CardMediaWhereUniqueInput): Promise<PrismaCardMedia> {
    return this.prisma.cardMedia.delete({
      where
    });
  }
}
